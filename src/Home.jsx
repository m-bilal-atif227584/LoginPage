import React from 'react';
import { logout } from './Config/firebase';

function Home() {
  return (
    <div className='flex flex-col justify-center cont items-center'>
    <div className='text-blue-400 font-[900] text-[2.7rem] text-center mt-20 underline'>HOME</div>
    <div className='text-center mt-8 text-[1.4rem] font-bold'>You are logged In.</div>
    <button onClick={()=>{logout()}} className='bg-red-500 text-white text-[1.2rem] cursor-pointer hover:text-[1.1rem] duration-200 border-[3px] rounded-lg border-black px-5 py-2 mx-auto mt-2.5'>Log out</button>
    </div>
  )
}

export default Home