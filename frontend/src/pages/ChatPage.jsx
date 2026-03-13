import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import BorderanimatedContainer from '../components/BorderanimatedContainer.jsx'

function ChatPage() {
  const { logout } = useAuthStore()
  return (


    <div className="w-full min-h-screen flex items-center justify-center ">

      <div className="relative w-full max-w-6xl md:h-[650px] h-[600px]">

        <BorderanimatedContainer>

        </BorderanimatedContainer>
      </div>
    </div>


  )
}

export default ChatPage
