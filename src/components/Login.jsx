import React, { useState } from 'react';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router';

const Login = () => {
  const auth = getAuth();


  // --------------- pass-eye
  const [showPass , setShowPass] = useState(false)

  const [formData , setformData] = useState({email:'' , password:''})

      // ------------regexData
        const emailData = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordData = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


  const handelLogin = ()=>{
    if(!formData.email) return alert('enter your email')
    if(!formData.password) return alert('password not matched')
      if(!emailData.test(formData.email)) return alert('Invalid Email')
      if(!passwordData.test(formData.password)) return alert('Password invalid')

        signInWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });




  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-md w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        
        <form onSubmit={handelLogin} className="space-y-4">
          {/* Email */}
          <div className="flex items-center bg-gray-800 px-4 py-3 rounded-md">
            <FaEnvelope className="mr-3 text-gray-400" />
            <input
                 onChange={(e)=>setformData((prev)=>({...prev , email:e.target.value}))}
              type="email"
              placeholder="Email"
              className="bg-transparent focus:outline-none w-full text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-800 px-4 py-3 rounded-md">
            <FaLock className="mr-3 text-gray-400" />
            <input
                 onChange={(e)=>setformData((prev)=>({...prev , password:e.target.value}))}
          type={showPass? 'text' : 'password'}  
              placeholder="Password"
              className="bg-transparent focus:outline-none w-full text-white placeholder-gray-400"
              required
            />

                  {
                   showPass?                         
                   <FaRegEyeSlash onClick={()=> setShowPass(!showPass)} className="text-[20px] dark:text-white absolute top-11 right-5" />  
                  :
                 <IoEyeOutline onClick={()=> setShowPass(!showPass)} className="text-[20px] dark:text-white absolute top-11 right-5" />                            
                 }
                      
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-pink-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white py-3 rounded-md font-semibold"
          >
            Login
          </button>
        </form>

        {/* Create Account */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to={'/register'} className="text-pink-400 hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
