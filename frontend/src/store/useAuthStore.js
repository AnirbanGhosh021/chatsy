import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client" 

 const  BASE_URL = "https://chatsy-backens.onrender.com";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigninUp: false,
  isLoggingIn: false,
  isProflieLoding:false,
  socket : null,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
        get().connectSocket()
    } catch (error) {
      console.log("Error in AuthCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/singup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully 🎉");
        get().connectSocket()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully 🎉");

      get().connectSocket()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
  
    try {
     await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout Successfully 🎉");
        get().disconnectSocket()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
      console.log("Logout error", error)
    }
  },
 updateProfile: async (data) => {
  set({ isProflieLoding: true });
  try {
    const res = await axiosInstance.put("/auth/update-profile", data)

    // ✅ Use only user object
    set({ authUser: res.data.user })

    toast.success("Profile Updated Successfully 🎉")
  } catch (error) {
    toast.error(error?.response?.data?.message || "Update failed")
    console.log("Profile Update error", error)
  }
  finally {
      set({ isProflieLoding: false });
    }
},

connectSocket: () => {
  const { authUser } = get()

  if (!authUser || get().socket?.connected) return

  const socket = io(BASE_URL, {
    withCredentials: true,
    autoConnect: false,
  })

  socket.connect()

  set({ socket })

  socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds })
  })
},

disconnectSocket: () => {
  const socket = get().socket
  if (socket?.connected) socket.disconnect()
  set({ socket: null })
},

}));
