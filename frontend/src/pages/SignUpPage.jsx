import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import BorderanimatedContainer from "../components/BorderanimatedContainer.jsx";
import {
  LockIcon,
  MailIcon,
  MessageCircleIcon,
  UserIcon,
} from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router";

function SignUpPage() {
  const [fromData, setFromData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigninUp } = useAuthStore();

  const handalSubmit = (e) => {
    e.preventDefault();
    signup(fromData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-6xl">
        <BorderanimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            
            {/* LEFT — FORM SECTION */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                
                {/* HEADER */}
                <div className="text-center mb-6 sm:mb-8">
                  <MessageCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-slate-400 mb-4" />

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>

                  <p className="text-slate-400 text-sm sm:text-base">
                    Sign up for a new account
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handalSubmit} className="space-y-5 sm:space-y-6">
                  
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-lable">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={fromData.fullName}
                        onChange={(e) =>
                          setFromData({
                            ...fromData,
                            fullName: e.target.value,
                          })
                        }
                        className="input text-base py-3"
                        placeholder="Anirban Ghosh"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-lable">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={fromData.email}
                        onChange={(e) =>
                          setFromData({
                            ...fromData,
                            email: e.target.value,
                          })
                        }
                        className="input text-base py-3"
                        placeholder="anirban@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="auth-input-lable">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={fromData.password}
                        onChange={(e) =>
                          setFromData({
                            ...fromData,
                            password: e.target.value,
                          })
                        }
                        className="input text-base py-3"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    className="auth-btn flex items-center justify-center w-full py-3 text-base"
                    type="submit"
                    disabled={isSigninUp}
                  >
                    {isSigninUp ? (
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* LOGIN LINK */}
                <div className="mt-5 sm:mt-6 text-center">
                  <Link to="/login" className="auth-link text-sm sm:text-base">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT — IMAGE SECTION (Desktop Only) */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-gradient-to-bl from-slate-800/20 to-transparent">
              <img
                src="/final1.png"
                alt="People using app"
                className="w-full object-contain"
              />
            </div>

          </div>
        </BorderanimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;