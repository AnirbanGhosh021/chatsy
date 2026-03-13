import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import BorderanimatedContainer from '../components/BorderanimatedContainer.jsx'
import ProfileHeader from '../components/ProfileHeader.jsx'
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx'
import ChatList from '../components/ChatList.jsx'
import ContactList from '../components/ContactList.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import NoCovaersationPlaceholder from '../components/NoCovaersationPlaceholder.jsx'

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore()

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-950">

      <div className="w-full max-w-6xl md:h-[650px] h-[600px]">

        <BorderanimatedContainer>

          {/* 🔥 ADD THIS FLEX WRAPPER */}
          <div className="w-full h-full flex overflow-hidden rounded-2xl">

            {/* LEFT SIDEBAR */}
            <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700">

              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats"
                  ? <ChatList />
                  : <ContactList />}
              </div>
            </div>

            {/* RIGHT CHAT AREA */}
            <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
              {selectedUser
                ? <ChatContainer />
                : <NoCovaersationPlaceholder />}
            </div>

          </div>

        </BorderanimatedContainer>

      </div>
    </div>
  )
}

export default ChatPage