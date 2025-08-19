        import { useState } from 'react';
        import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa'
        import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
        import { Bounce, toast } from 'react-toastify';
        import { IoEyeOutline } from "react-icons/io5";
        import { FaRegEyeSlash } from "react-icons/fa";
        import Login from './Login';
        import { Link, useNavigate } from 'react-router';

        const RegisterPage = () => {

          // ----------------- firebase auth
          const auth = getAuth();

          const navigate = useNavigate()

        // --------------- pass-eye
        const [showPass , setShowPass] = useState(false)

        // --------------- loding
        const [loading , setloading] = useState(false)


        // -------------------- errors

        const [formData , setformData] = useState({Username:'' , email:'' , password:'' , confirmPassword:''})
        // ------------ regexData
        const emailData = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordData = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        // -------------- handellaer
        const handelRegi =(e)=>{
          e.preventDefault()
          if(!formData.Username || !formData.email || !formData.password || !formData.confirmPassword) return alert('must fillup all field')
        if(!emailData.test(formData.email)) return alert('email not valid')
          if(!passwordData.test(formData.password)) return alert('Choose an strong password')
            else{
          setloading(!loading)
        // --------------------- firebase data
            createUserWithEmailAndPassword(auth, formData.email, formData. password)
          .then((userCredential) => {
              setloading(false)
            //------------------- Signed up 
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
          displayName: formData.Username , photoURL: "https://cdn.vectorstock.com/i/1000v/30/97/business-man-user-icon-vector-4333097.jpg"
        }).then(() => {
        sendEmailVerification(auth.currentUser)
        .then(() => {   
        toast.success('Otp Send your Email', {
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
        }).catch((error) => {
          // An error occurred
          // ...
        });
          })
        .catch((error) => {
         const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/email-already-in-use'){
        toast.info('Already Email taken', {
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
        }
        });
        }
        }

  return (
    <div className="min-h-screen w-full 
      bg-gradient-to-r from-pink-500  via-blue-500  to-red-500 
      bg-[length:400%_400%] animate-gradient 
      flex items-center justify-center font-poppins overflow-hidden">

      {/*----------- Glass card */}
      <div className="relative z-10 max-w-md w-full bg-white/10 border border-white/30 rounded-3xl shadow-lg p-10 backdrop-blur-md">

        {/*------------- Glowing gradient outline behind card */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-2xl opacity-40 animate-pulse"></div>

        <h2 className="text-white text-3xl font-semibold text-center mb-8 relative z-10">Register</h2>

        <form onSubmit={handelRegi} className="space-y-6 relative z-10">
          {/* Username */}
          <div className="relative">
            <FaUserAlt className="absolute top-3.5 left-4 text-white/70" />
            <input
            onChange={(e)=>setformData((prev)=>({...prev , Username:e.target.value}))}
              type="text"
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-4 text-white/70" />
            <input 
            onChange={(e)=>setformData((prev)=>({...prev , email:e.target.value}))}

              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-white/70" />
            <input
            onChange={(e)=>setformData((prev)=>({...prev , password:e.target.value}))}

                 type={showPass? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                    {
                    showPass?
                    
                    <FaRegEyeSlash onClick={()=> setShowPass(!showPass)} className="text-[20px] dark:text-white absolute top-[15px] right-5" />  
                    :
                    <IoEyeOutline onClick={()=> setShowPass(!showPass)} className="text-[20px] dark:text-white absolute top-[15px] right-5" />            
                  }
          </div>

          {/*---------------- Confirm Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-white/70" />
            <input
            onChange={(e)=>setformData((prev)=>({...prev , confirmPassword:e.target.value}))}
               type={showPass? 'text' : 'password'} 
              placeholder="Confirm Password"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                   {
                    showPass?
                    
                    <FaRegEyeSlash onClick={()=> setShowPass(!showPass)} className="text-[20px] dark:text-white absolute top-[15px] right-5" />  
                    :
                    <IoEyeOutline onClick={()=> setShowPass(!showPass)} className="text-[20px] dark:text-white absolute top-[15px] right-5" />             
                  }  
          </div>
          {/* Button */}
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
            className="w-full py-3 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white font-semibold shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-pink-400/50" >
           Create Account
          </button>
          }
          </div>
        </form>
        <p className="text-white/60 text-sm text-center mt-6 relative z-10">
          Already have an account?{' '}
          <Link to={'/login'}  className="text-pink-300 underline hover:text-white transition">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
