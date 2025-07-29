import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { loginUser } from '../APIServices/AuthApi.js'
import { Link, useNavigate } from 'react-router-dom';
import { RiCloseLargeFill } from "react-icons/ri";


function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const openForgotPassword = () => document.getElementById('admin_modal').showModal();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser({ email, password })
      console.log(res.data)
      if (res.data) {
        toast.success("Login successful");
        setEmail("")
        setPassword("")
        window.localStorage.setItem("userID", res.data.userid);
        window.localStorage.setItem("username", res.data.username);
        window.localStorage.setItem("Role", res.data.role);
        window.localStorage.setItem("Email", res.data.email);
        document.getElementById("my_modal_1").close();
        navigate("/DashBoard");
      }
    } catch (error) {
      const msg = error.response.data.error || "Something went wrong";
      setError(msg)
      setEmail("")
      setPassword("")

    }

  }
  return (
    <div >
      <dialog id="my_modal_1" className="modal w-[400px] m-auto">
        <div className="modal-box p-2">
          <button className="btn ml-72" onClick={() => document.getElementById("my_modal_1").close()}><RiCloseLargeFill /></button>
          <form method="dialog" className="modal-action mt-0 ">
            <fieldset className="bg-base-200 w-[350px] border-base-300 rounded-box p-4 ">
              <legend className="text-lg font-bold mb-2">Login</legend>
              {error && (
                <div className="text-red-500 font-medium mb-4">
                  {error}
                </div>
              )}

              <label className="label">Email</label>
              <input type="email" className="input mb-2 w-[300px]" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />

              <label className="label">Password</label>
              <input type="password" className="input mb-4 w-[300px]" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />

              <button className="btn btn-neutral mr-2" onClick={(e) => handleSubmit(e)}>Login</button>
                <span className="underline text-blue-500 cursor-pointer" onClick={() =>{
                  document.getElementById('my_modal_1').close();
                 navigate('/forgotPassword');}}
                    >Forgot Password</span>
           

              <p className="mt-4">
                Not Registered?
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => {
                    document.getElementById('my_modal_1').close();
                    document.getElementById('my_modal_2').showModal();
                  }}
                  >
                  Sign Up
                </span>
              </p>
            </fieldset>
          </form>
        </div>
      </dialog>

      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
<dialog id ='my_modal_1' className="modal   w-50 h-50">
  <div className="modal-box  ">
    <div className="modal-action">
      <form method="dialog">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" /> <br />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" /> <br />

  <button className="btn btn-neutral mt-4">Login</button>
</fieldset>
        <button className="btn">Close</button>
           <p>
                Not Registered ?
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => {
                    document.getElementById("my_modal_1").close();
                    document.getElementById("my_modal_2").showModal();
                  }}
                >
                  Sign Up
                </span>
              </p>
      </form>
      <Register/>
    </div>
  </div>
</dialog> */}
    </div>
  )
}

export default Login