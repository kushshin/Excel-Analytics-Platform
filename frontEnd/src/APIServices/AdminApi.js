import axios from 'axios';

const API = axios.create({
    baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

//Auth API
// export const registerUser = (userData)=> API.post("/auth/register",userData)
export const adminLogin = (userData)=>  API.post("/admin/adminlogin",userData)
export const allUsers = ()=>  API.get("/admin/allUsers")
export const allExcel = ()=>  API.get("/admin/allExcels")

