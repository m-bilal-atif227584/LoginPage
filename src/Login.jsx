import React, { useState, useEffect } from 'react';
// import assets from '../assets/assets'
// import { IoChatbubbleEllipsesSharp } from "react-icons/io5"
// import '../App.css'
import { signup, login, resetPass } from './Config/firebase'
import loginBg from './assets/loginBg.jpg'
function Login() {
  const [current, setcurrent] = useState("Sign Up");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const SubmitHandler = (event) => {
    event.preventDefault();
    if (current === "Sign Up") {
      signup(username, email, password);
      setemail("")
      setusername("")
      setpassword("")
    }
    else {
      login(email, password);
      setemail("")
      setpassword("")
    }
  }

  return (
    <>
      {/* <div className='dark absolute h-[100vh] w-[100vw] z-[1] top-0'></div> */}
      <img src={loginBg} alt="login" className='absolute top-0 h-[100vh] w-[100vw] bg-cover bg-center z-[0] object-cover'/>
      <div className='relative z-[2] flex justify-center items-center h-[100vh]'>
        <div className='glass border-4 border-black rounded-xl p-7 cont mx-3'>
          {/* <h1 className="head font-extrabold text-[3rem] w-[300px] ml-5">CHAT MATE</h1> */}
          <form onSubmit={SubmitHandler} className="login-form text-white flex flex-col gap-4 justify-center items-center">
            <h2 className='font-extrabold text-black text-[2.8rem] sign'>{current}</h2>
            {current === "Sign Up" ? <input onChange={(e) => setusername(e.target.value)} value={username} className='inpp text-black outline-none border-2 border-black rounded-md py-1 px-2 bg-gray-300' type="text" placeholder='Username' required /> : null}
            <input onChange={(e) => setemail(e.target.value)} value={email} className='inpp text-black outline-none border-2 border-black rounded-md py-1 px-2 bg-gray-300' type="email" placeholder='Email Address' required />
            <input onChange={(e) => setpassword(e.target.value)} value={password} className='inpp text-black outline-none border-2 border-black rounded-md py-1 px-2 bg-gray-300' type="password" placeholder='Password' required />
            <button className='bg-orange-500 border-[1px] border-black cursor-pointer hover:shadow-lg shadow-amber-400 duration-300 text-black font-bold py-1 px-3 rounded-md text-[1.1rem] btn' type='submit'>{current}</button>
            {current === "Sign Up" ? <div className="login-term text-black flex gap-1">
              <input className='cursor-pointer' type="checkbox" required />
              <p className='policy text-black'>Agree to the terms of use & privacy policy.</p>
            </div> : null}
            <div className="login-forget flex justify-center items-center flex-col gap-2">
              {current === "Sign Up" ? <p className="login-toggle text-black">Already have an account? <span className='underline cursor-pointer font-bold' onClick={() => setcurrent("Log In")}>click here to login</span></p> : <p className="login-toggle text-black">Don't have an account? <span onClick={() => setcurrent("Sign Up")} className='underline cursor-pointer font-bold'>click here to sign up</span></p>}
              {current === "Log In" ? <p className="login-toggle text-black">Forgot password? <span className='underline cursor-pointer font-bold' onClick={() => resetPass(email)}>click here to reset</span></p> : null }
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
