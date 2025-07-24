import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users as UsersIcon,
  FileSpreadsheet,
  BarChart3,
  Settings
} from "lucide-react";
import AdminNavbar from "../Components/AdminNavbar";
import Footer from "../Components/Footer";
import { allUsers, allExcel, allChart, deleteExcelById, deleteChartById, deleteUserById } from "../APIServices/AdminApi";

import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [excels, setExcels] = useState([]);
  const [charts, setCharts] = useState([]);

  const username = window.localStorage.getItem("adminUsername")

  const fetchAllUsers = async () => {
    try {
      const res = await allUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error("User fetching failed");
    }
  };

  const fetchAllExcel = async () => {
    try {
      const res = await allExcel();
      console.log(res.data)
      setExcels(res.data);
    } catch (error) {
      toast.error("Excel fetching failed");
    }
  };

  const fetchAllChart = async () => {
    try {
      const res = await allChart();
      console.log(res.data)
      setCharts(res.data);
    } catch (error) {
      toast.error("chart fetching failed");
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllExcel();
    fetchAllChart();
  }, []);

  const handleExcelDelete = async (id) => {
    try {
      await deleteExcelById(id)
      fetchAllExcel();
    } catch (error) {
      toast.error("excel delete failed");
    }
  }

  const handleChartDelete = async (id) => {
    try {
      await deleteChartById(id)
      fetchAllChart();
    } catch (error) {
      toast.error("excel delete failed");
    }
  }

  const handleUserDelete = async (id) => {
    try {
      await deleteUserById(id)
      fetchAllUsers();
    } catch (error) {
      toast.error("excel delete failed");
    }
  }

  const getChartCountByUser = (userId) => {
    return charts.filter((chart) => chart.uploadedBy === userId).length;
  };

  const SidebarLink = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="w-full flex items-center gap-3 rounded-xl px-4 py-2 text-base-content/80 hover:bg-base-300 hover:text-base-content transition-colors"
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div>
      <div className="flex lg:flex min-h-screen bg-base-200">
        <AdminNavbar />

        <aside className="lg:sticky top-0 flex md:h-screen lg:h-screen w-full md:w-64 lg:w-64 flex-col gap-4 border-r border-base-content/10 bg-base-100 p-4 shadow-lg">
          <h1 className="mb-4 text-center text-2xl font-semibold tracking-wide mt-20">
            Admin: {username}
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
        <div className="flex flex-1 flex-col mt-16">
          <main className="flex flex-col gap-10 p-6">
            <section className="card overflow-hidden rounded-box border border-base-content/5 bg-base-100 shadow">
              <header className="bg-base-200 px-4 py-3 text-lg font-medium">
                Users ({users.length})
              </header>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200 text-base font-semibold">
                      <th>Sr.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={user._id} className="hover:bg-base-300/40">
                        <td>{i + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className="badge badge-outline capitalize">
                            {user.role}
                          </span>
                        </td>
                        {user.role === 'admin' ? "" : <td className="flex justify-center">
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => handleUserDelete(user._id)}
                          >
                            <img
                              src="/img/trash.png"
                              alt="delete"
                              className="h-5 w-5"
                            />
                          </button>
                        </td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="card overflow-hidden rounded-box border border-base-content/5 bg-base-100 shadow">
              <header className="bg-base-200 px-4 py-3 text-lg font-medium">
                Uploaded Files ({excels.length})
              </header>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200 text-base font-semibold">
                      <th>Sr.</th>
                      <th>Filename</th>
                      <th>Size</th>
                      <th>Uploaded By</th>
                      <th>No.of charts <br />created</th>
                      <th>upload History</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excels.map((file, i) => (
                      <tr key={file._id} className="hover:bg-base-300/40">
                        <td>{i + 1}</td>
                        <td>{file.filename}</td>
                        <td>{(file.fileSize / 1024).toFixed(2)} KB</td>
                        {users.map((user) => user._id === file.uploadedBy ? <td key={user._id}>{user.username}</td> : "")}
                        {<td>{getChartCountByUser(file.uploadedBy)}</td>}
                        <td>{new Date(file.createdAt).toLocaleDateString()}</td>
                        <td className="flex justify-center">
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => handleExcelDelete(file._id)}
                          >
                            <img
                              src="/img/trash.png"
                              alt="delete"
                              className="h-5 w-5"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="card overflow-hidden rounded-box border border-base-content/5 bg-base-100 shadow">
              <header className="bg-base-200 px-4 py-3 text-lg font-medium">
                Charts ({charts.length})
              </header>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200 text-base font-semibold">
                      <th>Sr.</th>
                      <th>Title</th>
                      <th>ChartType</th>
                      {/* <th>ExcelfileName</th> */}
                      <th>CreatedBy</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charts.map((chart, i) => (
                      <tr key={chart._id} className="hover:bg-base-300/40">
                        <td>{i + 1}</td>
                        <td>{chart.title}</td>
                        <td>{chart.chartType}</td>
                        {/* {excels.map((excel)=>excel._id === chart.excelFileId ?<td key={excel._id}>{excel.filename}</td> : "")  } */}
                        {users.map((user) => user._id === chart.uploadedBy ? <td key={user._id}>{user.username}</td> : "")}
                        <td className="flex justify-center">
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => handleChartDelete(chart._id)}
                          >
                            <img
                              src="/img/trash.png"
                              alt="delete"
                              className="h-5 w-5"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer className='w-full' />
    </div>
  );
}
