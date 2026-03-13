import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore.js'
import PageLoader from './components/PageLoader.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#4c1d95,_#1e1b4b,_#020617)]">

      <Routes>
        <Route path='/' element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
