import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router'
import Home from './Home'
import Login from './Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Config/firebase'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  
  const navigate = useNavigate();
  // const {loadUserData} = useContext(AppContext)

 useEffect(()=>{
   onAuthStateChanged(auth, async (user) =>{
    if(user){
      navigate('/home')
      // await loadUserData(user.uid)
    }
    else{
      navigate('/')
    }
   });
 },[])

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>} />
    </Routes>
    </>
  )
}

export default App
