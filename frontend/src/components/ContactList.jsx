import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UserLoadingSkeletin from './UserLoadingSkeletin'
import NochatsFound from './NochatsFound'
import { useAuthStore } from '../store/useAuthStore'

function ContactList() {
 const { getAllContacts, allContacts, isUserLoading, setSelectedUser } = useChatStore()
   const {onlineUsers}= useAuthStore()
 
  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])
  if (isUserLoading) return <UserLoadingSkeletin />
  if (allContacts.length === 0) return <NochatsFound />
  return (
    <>
    {
      allContacts.map(contact=>(
        <div key={contact._id}
        className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
        onClick={()=> setSelectedUser(contact)}
        >
       <div className='flex items-center gap-3'>
        <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
          <div className='size-12 rounded-full'>
            <img src={contact.profilePic || "/proflie.webp"} alt={contact.fullName} />
          </div>
        </div>
        <h4 className='text-slate-200 font-medium truncate'>{contact.fullName}</h4>
       </div>
        </div>
      ))
    }
    </>
  )
}

export default ContactList
