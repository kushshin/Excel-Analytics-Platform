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
import { allUsers, allExcel } from "../APIServices/AdminApi";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [excels, setExcels] = useState([]);

  // -------------------- Data Fetching -------------------- //
  const fetchAllUsers = async () => {
    try {
      const res = await allUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error("User fetch failed");
    }
  };

  const fetchAllExcel = async () => {
    try {
      const res = await allExcel();
      setExcels(res.data);
    } catch (error) {
      toast.error("Excel fetch failed");
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllExcel();
  }, []);

  // -------------------- Helpers -------------------- //
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
    <div className="flex min-h-screen bg-base-200">
        <AdminNavbar />

      <aside className="sticky top-0 flex h-screen w-64 flex-col gap-4 border-r border-base-content/10 bg-base-100 p-4 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold tracking-wide">
          Admin
        </h1>
        <nav className="flex flex-1 flex-col space-y-1">
          <SidebarLink to="/admin" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink to="/admin/users" icon={UsersIcon} label="Users" />
          <SidebarLink to="/admin/files" icon={FileSpreadsheet} label="Files" />
          <SidebarLink to="/admin/analytics" icon={BarChart3} label="Analytics" />
          <div className="mt-auto pt-4">
            <SidebarLink to="/admin/settings" icon={Settings} label="Settings" />
          </div>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
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
                     {user.role  === 'admin' ? "": <td className="flex justify-center">
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => console.log("delete user", user._id)}
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
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {excels.map((file, i) => (
                    <tr key={file._id} className="hover:bg-base-300/40">
                      <td>{i + 1}</td>
                      <td>{file.filename}</td>
                      <td>{(file.fileSize / 1024).toFixed(2)} KB</td>
                      <td>{file.uploadedBy}</td>
                      <td className="flex justify-center">
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => console.log("delete file", file._id)}
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
      <Footer  className='w-full'/>
        </div>
  );
}
