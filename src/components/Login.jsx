import React, { useState } from 'react';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router';
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userAmount } from '../slice/UserSlice';

const Login = () => {
  const auth = getAuth();

  const navigete = useNavigate()

  // --------------- pass-eye
  const [showPass , setShowPass] = useState(false)

  // ---------- navigate

  const navigate = useNavigate()

  // ----------- dispatch
  const dispatch = useDispatch()

  const [formData , setFormData] = useState({email:'' , password:''})
   // --------------- loding
        const [loading , setLoading] = useState(false)

      // ------------regexData
        const emailData = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordData = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

// -------------- handelar
    const handelLogin = (e)=>{
    e.preventDefault()
    if(!formData.email) return alert('enter your email')
    if(!formData.password) return alert('password not matched')
      if(!emailData.test(formData.email)) return alert('Invalid Email')
      if(!passwordData.test(formData.password)) return alert('Password invalid')
         else{
         setLoading(!loading)
       signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
     setLoading(false)
    // Signed in 
    const user = userCredential.user;
    // ...
    if(user.emailVerified === false) return alert('user is not Verified')
      dispatch(userAmount(user))
      localStorage.setItem('userInfo' , JSON.stringify(user))
      navigate('/')  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false)
        toast.error('User not verified', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        });
        }
        }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
      <div className=" bg-[#0000003f]   p-8 rounded-xl shadow-md w-full max-w-md text-white">
        <div className=""></div>
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>   
        <form onSubmit={handelLogin} className="space-y-4">
                {/*---------- Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-4 text-white/70" />
            <input 
            onChange={(e)=>setFormData((prev)=>({...prev , email:e.target.value}))}
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          </div>
          {/*----------- Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-white/70" />
            <input
            onChange={(e)=>setFormData((prev)=>({...prev , password:e.target.value}))}
                 type={showPass? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"  />
                    {
                    showPass?
                    
                    <FaRegEyeSlash onClick={()=> setShowPass(!showPass)} className="text-[20px] dark:text-white absolute top-[15px] right-5" />  
                    :
                    <IoEyeOutline onClick={()=> setShowPass(!showPass)} className="text-[20px] dark:text-white absolute top-[15px] right-5" />            
                  }
          </div>
          {/*-------------- Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-pink-400 hover:underline">Forgot Password? </a>
          </div>
          {/*------------ Login Button */}
          <div>
             {
            loading?
              <button>
                <div
  class="mx-auto w-[500px] bg-gray-950 rounded-xl overflow-hidden drop-shadow-xl"
>
  <div class="bg-[#333] flex items-center p-[5px] text-whitec relative">
    <div class="flex absolute left-3">
      <span class="h-3.5 w-3.5 bg-[#ff605c] rounded-xl mr-2"></span>
      <span class="h-3.5 w-3.5 bg-[#ffbd44] rounded-xl mr-2"></span>
      <span class="h-3.5 w-3.5 bg-[#00ca4e] rounded-xl"></span>
    </div>
    <div class="flex-1 text-center text-white">status</div>
  </div>
  <div class="p-2.5 text-[#0f0]">
    <div>
      <span class="mr-2">Loading</span>
      <span class="animate-[ping_1.5s_0.5s_ease-in-out_infinite]">.</span>
      <span class="animate-[ping_1.5s_0.7s_ease-in-out_infinite]">.</span>
      <span class="animate-[ping_1.5s_0.9s_ease-in-out_infinite]">.</span>
    </div>
  </div>
    </div>
          </button>
            :
            <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white font-semibold shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-pink-400/50">
            Login
          </button>
          }
          </div>
        </form>
        {/*-------------- Create Account */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400"> Don't have an account?<Link to={'/register'} className="text-pink-400 hover:underline hover:text-white  font-medium">Create Account </Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
