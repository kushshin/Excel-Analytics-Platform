import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import DashBoard from './Pages/DashBoard'
import { Toaster } from "react-hot-toast";
import ExcelUploadPage from './Pages/ExcelUploadPage';
import CreateChart from './Pages/CreateChart';
import ChartGallery from './Pages/ChartGallery';
import AdminDashBoard from './Pages/AdminDashBoard';
import AdminChartGallery from './Pages/AdminChartGallery';
// import './App.css'

function App() {
 

  return (
    <>
      <div >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/DashBoard" element={<DashBoard/>} />
            <Route path="/uploadExcel" element={<ExcelUploadPage/>} />
            <Route path="/createChart/:id" element={<CreateChart/>} />
            <Route path="/chartGallery" element={<ChartGallery/>} />
            <Route path="/AdminDashBoard" element={<AdminDashBoard/>} />
            <Route path="/AdminChartGallery" element={<AdminChartGallery/>} />
            </Routes>       
        </BrowserRouter>
        <Toaster/>

      </div>
    
    </>
  )
}

export default App
