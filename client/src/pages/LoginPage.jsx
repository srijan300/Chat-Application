// import React, { useContext, useState } from 'react'
// import assets from '../assets/assets'
// import { AuthContext } from '../../context/AuthContext'

// const LoginPage = () => {

//   const [currState, setCurrState] = useState("Sign up")
//   const [fullName, setFullName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [bio, setBio] = useState("")
//   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

//   const {login} = useContext(AuthContext)

//   const onSubmitHandler = (event)=>{
//     event.preventDefault();

//     if(currState === 'Sign up' && !isDataSubmitted){
//       setIsDataSubmitted(true)
//       return;
//     }

//     login(currState=== "Sign up" ? 'signup' : 'login', {fullName, email, password, bio})
//   }

//   return (
//     <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

//       {/* -------- left -------- */}
//       <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]'/>

//       {/* -------- right -------- */}

//       <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
//         <h2 className='font-medium text-2xl flex justify-between items-center'>
//           {currState}
//           {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
//           }
          
//          </h2>

//         {currState === "Sign up" && !isDataSubmitted && (
//           <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
//            type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder="Full Name" required/>
//         )}

//         {!isDataSubmitted && (
//           <>
//           <input onChange={(e)=>setEmail(e.target.value)} value={email}
//            type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
//           <input onChange={(e)=>setPassword(e.target.value)} value={password}
//            type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
//           </>
//         )}

//         {currState === "Sign up" && isDataSubmitted && (
//             <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
//              rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio...' required></textarea>
//           )
//         }

//         <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
//           {currState === "Sign up" ? "Create Account" : "Login Now"}
//         </button>

//         <div className='flex items-center gap-2 text-sm text-gray-500'>
//           <input type="checkbox" />
//           <p>Agree to the terms of use & privacy policy.</p>
//         </div>

//         <div className='flex flex-col gap-2'>
//           {currState === "Sign up" ? (
//             <p className='text-sm text-gray-600'>Already have an account? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
//           ) : (
//             <p className='text-sm text-gray-600'>Create an account <span onClick={()=> setCurrState("Sign up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
//           )}
//         </div>
         
//       </form>
//     </div>
//   )
// }

// export default LoginPage



//main code .....
// import React, { useContext, useState } from 'react';
// import assets from '../assets/assets';
// import { AuthContext } from '../../context/AuthContext';

// const LoginPage = () => {
//   const [currState, setCurrState] = useState("Sign up");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [bio, setBio] = useState("");
//   const [step, setStep] = useState(1); // 1: basic info, 2: bio

//   const { login } = useContext(AuthContext);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Sign up process step-by-step
//     if (currState === "Sign up") {
//       if (step === 1) {
//         if (!fullName || !email || !password) return;
//         setStep(2);
//         return;
//       }

//       if (step === 2) {
//         if (!bio) return;
//         login("signup", { fullName, email, password, bio });
//         return;
//       }
//     }

//     // Login
//     login("login", { email, password });
//   };

//   const resetForm = () => {
//     setFullName("");
//     setEmail("");
//     setPassword("");
//     setBio("");
//     setStep(1);
//   };

//   const toggleState = () => {
//     resetForm();
//     setCurrState(currState === "Sign up" ? "Login" : "Sign up");
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center px-4">
//       <div className="max-w-4xl w-full flex flex-col sm:flex-row items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg p-6">
//         {/* Left logo */}
//         <img src={assets.logo_big} alt="QuickChat Logo" className="w-[min(40vw,250px)] mb-6 sm:mb-0 sm:mr-10" />

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex flex-col gap-5 text-white">
//           <h2 className="text-2xl font-semibold">
//             {currState}
//             {currState === "Sign up" && step === 2 && (
//               <img
//                 src={assets.arrow_icon}
//                 alt="Back"
//                 className="inline w-5 ml-2 cursor-pointer"
//                 onClick={() => setStep(1)}
//               />
//             )}
//           </h2>

//           {currState === "Sign up" && step === 1 && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="input-style"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="input-style"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="input-style"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </>
//           )}

//           {currState === "Sign up" && step === 2 && (
//             <textarea
//               placeholder="Tell us about yourself"
//               className="input-style"
//               rows={4}
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               required
//             />
//           )}

//           {currState === "Login" && (
//             <>
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="input-style"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="input-style"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </>
//           )}

//           <button type="submit" className="bg-violet-600 hover:bg-violet-700 py-2 rounded-md">
//             {currState === "Sign up" ? (step === 1 ? "Next" : "Create Account") : "Login Now"}
//           </button>

//           <div className="text-sm text-gray-400">
//             {currState === "Sign up"
//               ? "Already have an account? "
//               : "Don't have an account? "}
//             <span
//               className="text-violet-500 hover:underline cursor-pointer"
//               onClick={toggleState}
//             >
//               {currState === "Sign up" ? "Login here" : "Sign up here"}
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


//new-update code
import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/utils";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setBio("");
  };

  const toggleState = () => {
    resetForm();
    setCurrState(currState === "Sign up" ? "Login" : "Sign up");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currState === "Login") {
      login("login", { email, password });
      return;
    }

    // Sign up validation
    if (!fullName || !email || !password || !bio) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/auth/send-otp", { email });
      if (res.data.success) {
        toast.success("OTP sent to your email");
        navigate("/verify", {
          state: {
            fullName,
            email,
            password,
            bio,
          },
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to send OTP");
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-4xl w-full flex flex-col sm:flex-row items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg p-6">
        {/* Left logo */}
        <img
          src={assets.logo_big}
          alt="QuickChat Logo"
          className="w-[min(40vw,250px)] mb-6 sm:mb-0 sm:mr-10"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex flex-col gap-5 text-white">
          <h2 className="text-2xl font-semibold">{currState}</h2>

          {currState === "Sign up" && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="input-style"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input-style"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input-style"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <textarea
                placeholder="Short Bio"
                className="input-style"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </>
          )}

          {currState === "Login" && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                className="input-style"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input-style"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="bg-violet-600 hover:bg-violet-700 py-2 rounded-md">
            {currState === "Sign up" ? "Next" : "Login Now"}
          </button>

          <div className="text-sm text-gray-400">
            {currState === "Sign up"
              ? "Already have an account? "
              : "Don't have an account? "}
            <span
              className="text-violet-500 hover:underline cursor-pointer"
              onClick={toggleState}
            >
              {currState === "Sign up" ? "Login here" : "Sign up here"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

