import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {getAllExcelDataOfUser,deleteExcelById,getExcelId} from '../APIServices/ExcelApi'
import {getAllChartDataByUser,deleteChartDataByUser} from '../APIServices/ChartApi'
import Cookie from 'js-cookie'
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  Bar, Line, Pie, Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter,
} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
// import ExcelDataUpload from '../Components/ExcelDataUpload';
// import AllChartDisplay from './AllChartDisplay';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function DashBoard() {
  const [ExcelPreview, setExcelPreview] = useState([]);
  const [excelData, setExcelData] = useState([])
  const [excelFileName, setExcelFileName] = useState()
  const [excelId, setExcelId] = useState()
  const [chartData, setChartData] = useState([])
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userID")
  const chartStyles = {
    Bar, Line, Pie, Doughnut,
    Radar,
    PolarArea,
    Bubble,
    Scatter
  };
  // console.log(userId)


  const fetchAllData = async () => {
    try {
      const res = await getAllExcelDataOfUser(userId);
      console.log(res.data)
      const filename = res.data.excel.map((file) => file.filename)
      const excelid = res.data.excel.map((item) => item._id)
      console.log(excelid)
      setExcelId(excelid)
      setExcelData(res.data.excel)
      setExcelFileName(filename)
      // toast.success('fetching successful')
    } catch (error) {
      toast.error("Excel Data Fetching failed" );
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await getAllChartDataByUser(userId)
      console.log(res.data.chart)
      setChartData(res.data.chart)
    } catch (error) {
      toast.error( "Chart Data Fetching failed" );
    }
  }

  // useEffect(()=>{

  // },[])

  useEffect(() => {
    fetchChartData()
    fetchAllData();
  }, []);



  const handleDelete = async (id) => {
    console.log(id)
    try {
      await deleteExcelById(id)
      toast.success("Excel deleted successfully")

      await deleteChartDataByUser(id);
      toast.success("Associated charts deleted");

      fetchAllData()
      fetchChartData()
    } catch (error) {
      toast.error( " fail to delete excel File" )
    }
  }

  const handlePreview=async(id)=>{
    console.log(id)
   try {
    const res = await getExcelId(id)
    // console.log(res.data.excel.ExcelData)
   setExcelPreview(res.data.excel.ExcelData)
   } catch (error) {
    toast.error('fetching failed')
   }
  }

  const showExcelIdRelatedChart=(id)=>{
console.log(id)
  }



  return (
    <div>
      <Navbar />
      <div>
        <div className='flex justify-between mr-20 ml-20'>
          <div className="stats stats-vertical shadow mt-28">
            <div className="stat">
              <button className="btn bg-blue-400" onClick={() => navigate('/uploadExcel', { state: excelFileName })}    >UPLOAD EXCEL </button>
            </div>
            <div className="stat">
              <div className="stat-title">Excel File Uploaded</div>
              <p className="text-2xl font-bold">{excelData.length}</p>
              <progress className="progress progress-info w-56 " value={excelData.length} max="20"></progress>
            </div>
            <div className="stat">
              <div className="stat-title">Charts Uploaded</div>
              <p className="text-2xl font-bold ">{chartData.length}</p>
              <progress className="progress progress-info w-56 " value={chartData.length} max="20"></progress>
            </div>
          </div>
          <div>
            <div className='flex justify-around mt-28'>
              {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 my-6 mx-4 ">
              <div className="card bg-white shadow-md p-4 rounded-xl text-center">
              <Link to="/uploadExcel"> <button className="btn btn-accent"   >UPLOAD ONLY EXCEL FILE</button></Link>
              </div>
              <div className="card bg-white shadow-md p-4 rounded-xl text-center">
              <h2 className="text-xl font-semibold text-gray-600">Excel Files Uploaded</h2>
              <p className="text-2xl font-bold">{excelData.length}</p>
              <progress className="progress progress-info w-56" value={excelData.length} max="10"></progress>
              </div>
              <div className="card bg-white shadow-md p-4 rounded-xl text-center">
              <h2 className="text-xl font-semibold text-gray-600">Charts Created</h2>
              <p className="text-2xl font-bold">{chartData.length}</p>
                 <progress className="progress progress-info w-56" value={chartData.length} max="10"></progress>
              </div>
              </div> */}

              {/* <Link to="/uploadExcel"> <button className="btn btn-accent"   >UPLOAD ONLY EXCEL FILE</button></Link>
            <span className='w-50 h-50 border-2 rounded-[10px] p-3 text-black bg-white'>{excelData.length} excel uploaded <br></br>
            <progress className="progress progress-info w-56" value={excelData.length} max="10"></progress>
            </span>
            <span className='w-50 h-50 border-2 rounded-[10px] p-3 text-black bg-blue-400'>count of charts upload</span> */}
            </div>
            {excelData.length > 0 ? (<div className="overflow-x-auto border-2 rounded-lg shadow  w-[800px] m-auto">
              <h3 className='text-center font-bold'>Recent file uploaded</h3>
              <table className="table bg-white  ">
                <thead className="bg-gray-100">
                  <tr >
                    <th>Sr No.</th>
                    <th>File Name</th>
                    <th>Date Uploaded</th>
                    <th>File Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.filename}</td>
                      <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                      <td>{(item.fileSize / 1024).toFixed(2)} KB</td>
                      <td className="space-x-2">
                        <button
                          className="btn btn-sm btn-accent"
                          onClick={() => navigate(`/createChart/${item._id}`)}
                        >
                          Analyse
                        </button>
                        <button
                          className="btn btn-sm btn-accent"
                          onClick={() => handlePreview(item._id)}
                        >
                          Preview
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>) :
              (<p className='text-center mt-10'>No Excel File uploaded yet....</p>)
            }
            
          </div>
          
        </div>
        <div className='w-[800px] m-auto  mt-5 '>
          {/* <h1>Excel Preview</h1> */} 
          {ExcelPreview.length > 0 && (
            <div className="overflow-x-auto border-2 rounded-[10px]  p-4">
              <h2 className="text-xl font-semibold mb-3 text-center">Excel File Preview</h2>
              {/* <button onClick={showExcelIdRelatedChart}>visualize chart</button> */}
              <table className="table table-zebra w-full border">
                <thead>
                  <tr>
                    
                    {Object.keys(ExcelPreview[0]).map((key) => (
                      <th key={key} className="border px-2 py-1 bg-gray-100">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ExcelPreview.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, index) => (
                        <td key={index} className="border px-2 py-1">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex justify-center mt-10'>
              <button className="btn btn-accent " onClick={() => setExcelPreview([])}>close</button>
              <button className="btn btn-accent " onClick={() => showExcelIdRelatedChart(excelId)}>visualize  </button>
              </div>
            </div>
          ) }
        </div>
        <div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {chartData.map((chart) => {
                // <p className='text-center mt-20'>Recent Charts</p>
                const ChartComponent = chartStyles[chart.chartType];
                if (!ChartComponent) return <div key={chart._id}>Invalid chart type: {chart.chartType}</div>;

                const chartData = {
                  labels: chart.labels,
                  datasets: chart.datasets,
                };

                return (
                  <div key={chart._id} className="bg-white p-4 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-2">{chart.chartTitle}</h2>
                    <ChartComponent data={chartData} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default DashBoard