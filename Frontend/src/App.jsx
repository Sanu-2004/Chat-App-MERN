import React from 'react'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import Signup from './components/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import './App.css'
import { useUsercontext } from './Context/UserContext'

const App = () => {
  const {user}=useUsercontext()
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={user? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user? <Signup /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
