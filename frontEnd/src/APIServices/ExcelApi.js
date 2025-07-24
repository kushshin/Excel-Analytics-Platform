import axios from 'axios';

const API = axios.create({
     baseURL : import.meta.env.VITE_API_BASE_URL,
    // baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

export const uploadExcel = (formData) => API.post('/excel/upload', formData);
export const getExcelId = (id) => API.get(`/excel/ExcelId/${id}`);
export const getAllExcelDataOfUser = (id) => API.get(`/excel/getAllExcelDataOfUser/${id}`);
export const deleteExcelById =(id)=> API.delete(`/excel/deleteExcel/${id}`)