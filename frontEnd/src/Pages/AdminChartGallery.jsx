import React from 'react'
import { Link } from 'react-router-dom'
import AdminNavbar from '../Components/AdminNavbar'
import AllChartDisplay from './AllChartDisplay'
import Footer from '../Components/Footer'
import {
  LayoutDashboard,
  Users as UsersIcon,
  FileSpreadsheet,
  BarChart3,
  Settings
} from "lucide-react";

function AdminChartGallery() {
     const SidebarLink = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl px-4 py-2 text-base-content/80 hover:bg-base-300 hover:text-base-content transition-colors"
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
  return (
    <div>
        <div className='md:flex lg:flex min-h-screen bg-base-200 '>
        <AdminNavbar/>
          <aside className="lg:sticky top-0 flex md:h-screen lg:h-screen w-[100%] md:w-64 lg:w-64 flex-col gap-4 border-r border-base-content/10 bg-base-100 p-4 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold tracking-wide mt-20">
          Admin
        </h1>
        <nav className="flex flex-1 flex-row md:flex-col lg:flex-col space-y-1">
          <SidebarLink to="/AdminDashBoard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink to="" icon={UsersIcon} label="Users" />
          <SidebarLink to="" icon={FileSpreadsheet} label="Files" />
          <SidebarLink to="/AdminChartGallery" icon={BarChart3} label="chart Gallery" />
          {/* <div className="mt-auto pt-4">
            <SidebarLink to="/admin/settings" icon={Settings} label="Settings" />
          </div> */}
        </nav>
      </aside>
      <div className='w-full px-4 sm:px-6 md:px-8 lg:w-[1200px] mx-auto'>
        <AllChartDisplay/>
      </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AdminChartGallery