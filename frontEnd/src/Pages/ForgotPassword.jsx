import React,{useState} from 'react'
import { RiCloseLargeFill } from "react-icons/ri";
import { forgotPassword } from '../APIServices/AuthApi';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';



function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await forgotPassword({ email });
      console.log(res.data)
     toast.success(res.data.msg)
      setEmail("")  
    navigate('/')
    } catch (error) {
      toast.error({error:"unable to send reset link"})
    }
  };

  return (
    <div>
         <Navbar/>
                <div className=" mt-28 mb-28 ">
                      {/* <p className='text-green-300 font-semibold text-center'>{msg}</p> */}
                    <fieldset className="bg-base-200 border-base-300 rounded-box p-4 w-[400px] mx-auto">
                      <legend className="text-lg font-bold mb-2">Forgot Password</legend>
                      <label className="label ">Email</label>
                      <input type="email" className="input mb-2 w-96" value={email} placeholder="Email"  onChange={(e)=>setEmail(e.target.value)}/> <br />        
                      <button className="btn btn-neutral" onClick={handleSubmit} >Submit</button>
                    </fieldset>
               
                </div>
            <Footer/>
    </div>
  )
}

export default ForgotPassword