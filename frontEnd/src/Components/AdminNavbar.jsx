import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import AdminLogin from '../Pages/AdminLogin';
import Cookie from 'js-cookie'
import toast from 'react-hot-toast';
import { FaChartLine } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";
import { RiDashboard2Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
// import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { VscSignIn } from "react-icons/vsc";
import { FaCaretDown } from "react-icons/fa";
import { FcComboChart } from "react-icons/fc";
import { IoMdDownload } from "react-icons/io";
import { RiGalleryView2 } from "react-icons/ri";
// import { FaChartLine } from "react-icons/fa";


function AdminNavbar() {
//   const openLogin = () => document.getElementById('my_modal_1').showModal();
  // const openRegister = () => document.getElementById('my_modal_2').showModal();
//   const openAdmin = () => document.getElementById('admin_modal').showModal();
  const navigate = useNavigate();
  const username = window.localStorage.getItem("adminUsername")
  const userId = window.localStorage.getItem("adminuserID")
  const role = window.localStorage.getItem("adminRole")
  // console.log(username)

  const handleLogout = () => {
    Cookie.remove("adminToken");
    window.localStorage.clear("");
    toast.success("admin logged out successfully ");
    navigate("/");

  }
//   const token = Cookie.get('Token')
  const Atoken = Cookie.get('adminToken')

  useEffect(() => {
    //  console.log(admintoken)
  }, [ Atoken])



  return (
    <div>
      <nav className="  bg-gray-100 shadow-md z-10 fixed top-0 w-[100%]">
        <div className="navbar bg-blue-100 shadow-sm  z-10">
          <img src="../img/chart1.png" alt="" className='w-10 h-10 ml-5' />
          <div className="navbar-start flex justify-center items-center  ml-48 ">
            <div className="navbar-center ">
              <Link to=""> <div className="text-xl font-bold flex items-center  text-gray-400"><span className='text-blue-600 text-3xl '>C</span>hart <span className='text-blue-600 text-3xl'>E</span>ase <FcComboChart /></div></Link>
            </div>
          </div>
          {/* <Link to="/"> <div className="text-xl font-bold">Excel Analytics Platform</div></Link>     */}
          {/* <div >
            <Link to='/'>  <button className=" btn mr-2 bg-blue-400">Home</button></Link>
            <a href="#about" className="btn mr-2 ">About Us</a>
            <a href="#contact" className="btn mr-2 ">Contact</a>
          </div> */}
      
          <div className="dropdown relative ">
            <div tabIndex={0} role="button" className="btn btn-ghost ">
              {Atoken ?
                (<h4 className='mr-1 flex'><span className='font-bold text-blue-500'> {role}</span><FaCaretDown /></h4>) :
                (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>)}
            </div>
            <ul
              tabIndex={0}
              // className="  p-0 absolute right-0 top-0 menu menu-sm  bg-blue-100 rounded-box z-1  ">
              className="  absolute right-0 menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3  shadow w-[170px] text-blue-500">
              {Atoken ?
                <div className=' justify-between items-center text-blue-500'>
                  {/* <li> <h4 className='mr-20'><CgProfile /><span className='font-bold'> {username}</span></h4></li> */}
                  {/* <Link to='/DashBoard'><li><button ><RiDashboard2Fill />DashBoard</button></li> </Link>
                  <Link to="/uploadExcel"> <li> <button  ><FaUpload />Upload</button></li></Link> */}
                    {/* <Link to='/chartGallery'><li> <button ><RiGalleryView2 />Chart Gallery</button></li> </Link> */}
                  <li><button onClick={handleLogout}><FiLogOut />Logout</button>  </li>
                </div> :
                <li><button onClick={openLogin}><VscSignIn />SignIn/SignUp</button></li>}
                {/* {role === "user" ?  <li> <button onClick={() => toast.error("Not Authorized")}><MdAdminPanelSettings />Admin Login</button></li> : 
                 <li> <button onClick={openAdmin}><MdAdminPanelSettings />Admin Login</button></li>
                } */}           
            </ul>
          </div>
        </div>
      </nav>
      <AdminLogin />
    </div>
  )
}

export default AdminNavbar
