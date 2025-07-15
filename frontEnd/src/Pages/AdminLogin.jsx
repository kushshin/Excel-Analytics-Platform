import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { adminLogin } from '../APIServices/AdminApi'
import toast from 'react-hot-toast'
import { RiCloseLargeFill } from "react-icons/ri";

function AdminLogin() {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[error,setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit=async(e)=>{
    console.log('clicked')
    e.preventDefault()
    try {
      const res = await adminLogin({ email, password, role : 'admin'})
        console.log(res.data)
          if (res.data) {
               toast.success("admin Login successful");
               setEmail("")
               setPassword("")
                window.localStorage.setItem("adminuserID", res.data.userid);
                window.localStorage.setItem("adminUsername", res.data.username);
                window.localStorage.setItem("adminRole", res.data.role);
                document.getElementById("my_modal_1").close();
                navigate("/AdminDashBoard");
          }
    } catch (error) {
      const msg = error.response.data.error || "Something went wrong";
      setError(msg)
    }

  }
  return (
    <div>
         <dialog id="admin_modal" className="modal">
      <div className="modal-box w-[350px]">
            <button className="btn ml-60" onClick={() => document.getElementById("admin_modal").close()}><RiCloseLargeFill /></button>
        <form method="dialog" className="modal-action">
          <fieldset className="bg-base-200 border-base-300 rounded-box p-4 w-[300px]">
            <legend className="text-lg font-bold mb-2">AdminLogin</legend>
  {error && (
  <div className="text-red-500 font-medium mb-4">
    {error}
  </div>
)}
            <label className="label">Email</label>
            <input type="email" className="input mb-2 w-64" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} /> <br />

            <label className="label">Password</label>
            <input type="password" className="input mb-4 w-64" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} /><br />

            <button className="btn btn-neutral" onClick={(e)=>handleSubmit(e)}>Login</button>
          </fieldset>
        </form>
      </div>
    </dialog>
 
    </div>
  )
}

export default AdminLogin