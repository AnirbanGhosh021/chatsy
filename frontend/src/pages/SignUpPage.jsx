import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import BorderanimatedContainer from '../components/BorderanimatedContainer.jsx'
import { Lock, LockIcon, MailIcon, MessageCircleIcon, UserIcon } from 'lucide-react'
import { LoaderIcon } from 'react-hot-toast'
import { Link } from "react-router"

function SignUpPage() {


  const [fromData, setFromData] = useState({ fullName: "", email: "", password: "" })
  const { signup, isSigninUp } = useAuthStore()

  const handalSubmit = (e) => {
    e.preventDefault();
    signup(fromData)
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center ">

      <div className="relative w-full max-w-6xl md:h-[650px] h-[600px]">

        <BorderanimatedContainer>

          <div className="w-full h-full flex flex-col md:flex-row">

            <div className=" md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">

                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">
                    Sign up for a new account
                  </p>
                </div>

                <form onSubmit={handalSubmit} className="space-y-6">

                  <div>
                    <label className="auth-input-lable">Full Name</label>

                    <div className="relative">
                      <UserIcon className="auth-input-icon" />

                      <input
                        type="text"
                        value={fromData.fullName}
                        onChange={(e) =>
                          setFromData({ ...fromData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="Anirban Ghosh"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="auth-input-lable">Email</label>

                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={fromData.email}
                        onChange={(e) =>
                          setFromData({ ...fromData, email: e.target.value })
                        }
                        className="input"
                        placeholder="anirabn@gmail.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="auth-input-lable">Password</label>

                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={fromData.password}
                        onChange={(e) =>
                          setFromData({ ...fromData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  <button className='auth-btn' type='submit' disabled={isSigninUp}>
                    {
                      isSigninUp ? (
                        <LoaderIcon className='w-full h-5 animate-spin text-center' />
                      ) : (
                        "Craete Account"
                      )

                    }
                  </button>


                </form>
                <div className='mt-6 text-center '>
                  <Link to="/login" className="auth-link">
                    Already have a account ? Login
                  </Link>
                </div>

              </div>
            </div>
            <div className= 'hidden md:w-1/2  md:flex flex-col items-center justify-center  bg-gradient-to-bl from-slate-800/20 to-transparent'>
             
              
              <img src="/final1.png" alt="People using " className=' w-full  object-contain ' />
                
              
              

            </div>
          </div>
        </BorderanimatedContainer>
      </div>
    </div>
  )
}

export default SignUpPage
