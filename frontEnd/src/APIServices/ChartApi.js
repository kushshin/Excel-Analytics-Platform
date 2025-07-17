import axios from 'axios';

const API = axios.create({
    baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

export const saveChart  = (formData) => API.post('/chart/saveChart', formData);
// export const ChartAI  = (chartData) => API.post('/chart/generate-summary', chartData);
export const getAllChartDataByUser  = (id) => API.get(`/chart/getAllChartDataByUser/${id}`);
export const deleteChartDataByUser  = (id) => API.delete(`/chart/deleteChartDataByUser/${id}`);
export const deleteChartDataByChartId  = (id) => API.delete(`/chart/deleteChartDataByChartId/${id}`);
export const getChartByExcelFile  = (id) => API.get(`/chart/getChartByExcelId/${id}`);
export const getAllChartData  = () => API.get('/chart/getAllChartData');