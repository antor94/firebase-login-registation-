import React from 'react'
import { FaBell, FaThLarge } from 'react-icons/fa'
import { FiSearch, FiSun } from 'react-icons/fi'
import { Link } from 'react-router'
import { LuLogOut } from "react-icons/lu";
import { useSelector } from 'react-redux';

const Navbar = () => {



const currentUser = useSelector((state)=>state.currentUserId.value)


  return (
    <>
    
        <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow">
      {/*-------- Left Section */}
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold">My Notes</h1>

          </div>
        {/* Search Bar */}
        <div className="w-[900px] relative">
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-[500px] pl-10 pr-4 py-2 rounded-md bg-gray-800 text-sm text-white placeholder-gray-400 outline-none border border-gray-700 " />
        </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
            {/* Avatar (just placeholder) */}
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer"><img src={currentUser?.photoURL} alt="" /> </div>
        <h2 className='text-base'>{currentUser?.displayName}</h2>
       <Link to={'/login'} ><LuLogOut /></Link>
        <FaBell className="text-lg cursor-pointer hover:text-gray-300" />
        <FaThLarge className="text-lg cursor-pointer hover:text-gray-300" />

        {/* Theme Icon */}
        <FiSun className="text-lg cursor-pointer hover:text-yellow-300" />
      </div>
    </nav>
  
    </>
  )
}

export default Navbar