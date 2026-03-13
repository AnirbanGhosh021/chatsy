import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from 'lucide-react'
import { LoaderIcon } from 'react-hot-toast'

const mouseClickSound = new Audio("/sound/click.mp3")

function ProfileHeader() {
  const { logout, authUser, updateProfile, isProflieLoding } = useAuthStore()
  const { toggleSound, isSoundEnabled } = useChatStore()
  const [selectedImg, setSelectedImage] = useState(null)


  const fileInputRef = useRef(null)

  const handalImageUplode = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      const base64Image = reader.result
      setSelectedImage(base64Image)
      await updateProfile({ profilePic: base64Image })
    }
  }

  return (
    <div className='p-6 border-b border-slate-700/50 '>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='avatar online'>
            <button className='size-14 flex items-center justify-center rounded-full overflow-hidden relative group'
              onClick={() => fileInputRef.current.click()}
            >
              {isProflieLoding ? (
                <LoaderIcon className='w-full h-6 animate-spin text-center' />
              ) : <>
                <img src={selectedImg || authUser.profilePic || "/proflie.webp"} alt="user image"
                  className='size-full object-cover opacity-80' />
                <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
                  <span className='text-white text-xs'>Change</span>
                </div>
              </>}

            </button>
            <input type="file"
              accept='image/*'
              ref={fileInputRef}
              onChange={handalImageUplode}
              className='hidden' />
          </div>
          {/* userName online Text */}
          <div>
            <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
              {authUser.fullName}
            </h3>
            <p className='text-slate-400 text-xs'>Online</p>
          </div>
        </div>

        {/* buttans */}
        <div className='flex gap-4 items-center'>
          {/* logout btn */}
          <button
            className='text-slate-400 hover:text-slate-200 transition-colors'
            onClick={logout}
          >
            <LogOutIcon className='size-5' />
          </button>
          {/* sound  */}
          <button
            className='text-slate-400 hover:text-slate-200 transition-colors'
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error))
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className='size-5' />

            )
              : (<VolumeOffIcon className='size-5' />)}

          </button>
        </div>
      </div>

    </div>
  )
}

export default ProfileHeader
