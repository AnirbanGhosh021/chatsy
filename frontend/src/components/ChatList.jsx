import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UserLoadingSkeletin from './UserLoadingSkeletin'
import NochatsFound from './NochatsFound'

function ChatList() {

  const { getMyChatPartners, chats, isUserLoading, setSelectedUser } = useChatStore()
  useEffect(() => {
    getMyChatPartners()
  }, [getMyChatPartners])
  if (isUserLoading) return <UserLoadingSkeletin />
  if (chats.length === 0) return <NochatsFound />
  return (
    <>
    {
      chats.map(chat=>(
        <div key={chat._id}
        className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
        onClick={()=> setSelectedUser(chat)}
        >
       <div className='flex items-center gap-3'>
        <div className={`avatar online`}>
          <div className='size-12 rounded-full'>
            <img src={chat.profilePic || "/proflie.webp"} alt={chat.fullName} />
          </div>
        </div>
        <h4 className='text-slate-200 font-medium truncate'>{chat.fullName}</h4>
       </div>
        </div>
      ))
    }
    </>
  )
}

export default ChatList
