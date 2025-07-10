import React,{useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import { registerUser } from '../APIServices/AuthApi.js';
import { RiCloseLargeFill } from "react-icons/ri";


function Register() {
const[userDetails,setUserDetails] = useState({
  username: "",
  email: "",
  password:"",
})

const[error,setError] = useState("")

const handleChange=(e)=>{
  e.preventDefault()
   setUserDetails({  ...userDetails, 
      [e.target.name]: e.target.value })
}

const handleSubmit= async (e)=>{
  e.preventDefault()
try {
  const res = await registerUser({
    ...userDetails
  })
    if (res.data) {
        toast.success("signup successful");
        document.getElementById("my_modal_2").close();
      }
} catch (error) {
  const msg = error.response.data.error || "Something went wrong";
  setError(msg)
}
}

  return (
    <div >
      <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-[400px] p-2">
         <button className="btn ml-80"  onClick={() => document.getElementById("my_modal_2").close()}><RiCloseLargeFill /></button>
        <form method="dialog" className="modal-action mt-0">
          <fieldset className="bg-base-200  w-[390px] border-base-300 rounded-box p-4">
            <legend className="text-lg font-bold mb-2">Sign Up</legend>
            {error && (
  <div className="text-red-500 font-medium mb-4">
    {error}
  </div>
)}

            <label className="label">Username</label>
            <input type="text" className="input mb-2 w-[320px]"  value={userDetails.username}  name='username' placeholder="Username"  onChange={(e)=>handleChange(e)} /><br />

            <label className="label">Email</label>
            <input type="email" className="input mb-2 w-[320px]"  value={userDetails.email}  name='email' placeholder="Email" onChange={(e)=>handleChange(e)}/><br />

            <label className="label">Password</label>
            <input type="password" className="input mb-4 w-[320px]"  value={userDetails.password}  name='password' placeholder="Password" onChange={(e)=>handleChange(e)}/><br />

            <button className="btn btn-neutral" onClick={(e)=>handleSubmit(e)}>SignUp</button>
            {/* <button className="btn ml-2">Close</button> */}

            <p className="mt-4">
              Already have an account?
              <span
                className="underline text-blue-500 cursor-pointer"
                onClick={() => {
                  document.getElementById('my_modal_2').close();
                  document.getElementById('my_modal_1').showModal();
                }}
              >
                Login
              </span>
            </p>
          </fieldset>
        </form>
      </div>
    </dialog>

  {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
  <dialog id ='my_modal_2' className="modal   w-50 h-50">
    <div className="modal-box  ">
      <div className="modal-action">
        <form method="dialog">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs">
    <legend className="fieldset-legend">SignUp</legend>
  
    <label className="label">username</label>
    <input type="email" className="input" placeholder="Email" /> <br />

    <label className="label">Email</label>
    <input type="email" className="input" placeholder="Email" /> <br />
  
    <label className="label">Password</label>
    <input type="password" className="input" placeholder="Password" /> <br />
  
    <button className="btn btn-neutral mt-4">Register</button>
  </fieldset>
          <button className="btn">Close</button>
             <p>
                  Already have a account ?
                  <span
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() => {
                      document.getElementById("my_modal_2").close();
                      document.getElementById("my_modal_1").showModal();
                    }}
                  >
                   Login
                  </span>
                </p>
        </form>
        
      </div>
    </div>
  </dialog> */}
      </div>
  )
}

export default Register