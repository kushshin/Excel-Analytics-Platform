// pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { resetPassword } from '../APIServices/AuthApi';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
//       const res = await axios.post(`http://localhost:3001/api/auth/reset-password/${token}`, {
//   newPassword
// },{withCredentials:true});
      const res = await axios.post("http://localhost:3001/api/auth/reset-password", {
  newPassword},
{headers: {
    Authorization: `Bearer ${token}`
  }});
      console.log(res.data)
      document.getElementById('my_modal_1').showModal();
      toast.success('Password reset successfully.please Login again');
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
        <Navbar/>
        <div className='mt-28  mb-28'>
      {/* <h2>Reset Your Password</h2> */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset</button>
      </form> */}
         <fieldset className="bg-base-200 border-base-300 rounded-box p-4 w-[400px] mx-auto">
                      <legend className="text-lg font-bold mb-2">Reset Your Password</legend>
                      <label className="label ">New Password</label>
                      <input type="password" className="input mb-2 w-96" value={newPassword} placeholder="New Password"  onChange={(e)=>setNewPassword(e.target.value)}/> <br />        
                      <button className="btn btn-neutral" onClick={handleSubmit} >Reset</button>
                    </fieldset>
        </div>
      <Footer/>
    </div>
  );
};

export default ResetPassword;
