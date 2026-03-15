import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore.js"
import toast from "react-hot-toast";

const notificationSound =  new Audio("/sound/notifaction.wav")

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },
    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            console.log("Error in allContacts", error);

        } finally {
            set({ isUserLoading: false });
        }
    },
    getMyChatPartners: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            console.log("Error in allContacts", error);
        } finally {
            set({ isUserLoading: false });
        }
    },


    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log("Error in GetMessages", error);
                toast.error(error?.response?.data?.message || "Messages Fatch  failed");

        } finally {
            set({ isMessagesLoading: false });
        }
    },
   sendMessage: async (messageData) => {
  const { selectedUser, messages } = get()
  const { authUser } = useAuthStore.getState()

  const tempId = `temp-${Date.now()}`

  const optimisticMessage = {
    _id: tempId,
    senderId: authUser._id,
    receiverId: selectedUser._id,
    text: messageData.text,
    image: messageData.image,
    createdAt: new Date().toISOString(),
    isOptimistic: true,
  }

  set({ messages: [...messages, optimisticMessage] })

  try {
    const res = await axiosInstance.post(
      `/messages/send/${selectedUser._id}`,
      messageData
    )

    const currentMessages = get().messages

    set({
      messages: currentMessages
        .filter(msg => msg._id !== tempId)
        .concat(res.data)
    })

  } catch (error) {
    set({ messages })
    console.log("Error in Send Message ", error)

    toast.error(
      error?.response?.data?.message || "Message send failed"
    )
  }
},
  subscribeToMessage: () => {
  const { selectedUser, isSoundEnabled } = get()
  const socket = useAuthStore.getState().socket

  if (!selectedUser || !socket) return

  // ❗ Remove old listener first (prevents duplicates)
  socket.off("newMessage")

  socket.on("newMessage", (newMessage) => {

    // ✅ Only add if message belongs to current chat
    if (
      newMessage.senderId !== selectedUser._id &&
      newMessage.receiverId !== selectedUser._id
    ) return

    const currentMessages = get().messages
    set({ messages: [...currentMessages, newMessage] })

    // 🔊 Play sound ONLY when message arrives
    if (isSoundEnabled) {
      notificationSound.currentTime = 0
      notificationSound
        .play()
        .catch(e => console.log("Audio play failed", e))
    }
  })
},
unsubscribeFromMessage: () => {
  const socket = useAuthStore.getState().socket
  socket?.off("newMessage")
}

}))