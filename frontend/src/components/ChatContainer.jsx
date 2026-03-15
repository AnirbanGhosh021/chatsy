import React, { useEffect , useRef} from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatHeader from './ChatHeader'
import NoChatPlacehodlder from './NoChatPlacehodlder'
import MessageInput from './MessageInput'
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton'

function ChatContainer() {

  const {selectedUser,getMessagesByUserId, messages ,isMessagesLoading, subscribeToMessage, unsubscribeFromMessage} = useChatStore()
  const {authUser} = useAuthStore()
   const messagesEndRef = useRef(null)
  useEffect(()=>{
    getMessagesByUserId(selectedUser._id)
    subscribeToMessage()


    return ()=> unsubscribeFromMessage()
  },[selectedUser,getMessagesByUserId, subscribeToMessage, unsubscribeFromMessage])
  useEffect(()=>{
  if(messagesEndRef.current){
    messagesEndRef.current.scrollIntoView({behavior : "smooth"})

  }
  },[messages])
 

  

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0  && !isMessagesLoading? (
          <div className="max-w-3xl mx-auto space-y-3">
            {messages.map((mes) => (
              <div
                key={mes._id}
                className={`chat ${
                  mes.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble p-3 ${
                    mes.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {mes.image && (
                    <img
                      src={mes.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover mb-2"
                    />
                  )}

                  {mes.text && <p>{mes.text}</p>}
                  <p className='text-[10px] mt-1 opacity-75 flex items-center gap-1 justify-end'>
                    {new Date(mes.createdAt).toLocaleTimeString([], {hour:"2-digit" ,minute:"2-digit"})}
                  </p>
                </div>
              </div>
            ))} 
            <div ref={messagesEndRef} />
          </div>
        ) : isMessagesLoading? <MessagesLoadingSkeleton /> :(
          <NoChatPlacehodlder name={selectedUser?.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  )
}

export default ChatContainer
