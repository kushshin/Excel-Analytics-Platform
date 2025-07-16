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
        <AdminNavbar/>
        <div className='flex '>
            <aside className="sticky top-0 flex h-screen w-64 flex-col gap-4 border-r border-base-content/10 bg-base-100 p-4 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold tracking-wide mt-20">
          Admin
        </h1>
        <nav className="flex flex-1 flex-col space-y-1 ">
          <SidebarLink to="/AdminDashBoard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink to="" icon={UsersIcon} label="Users" />
          <SidebarLink to="" icon={FileSpreadsheet} label="Files" />
          <SidebarLink to="/AdminChartGallery" icon={BarChart3} label="chart Gallery" />
          <div className="mt-auto pt-4">
            <SidebarLink to="/admin/settings" icon={Settings} label="Settings" />
          </div>
        </nav>
      </aside>
      <div className='w-[1200px]'>
        <AllChartDisplay/>
      </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AdminChartGallery