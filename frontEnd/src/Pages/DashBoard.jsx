import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { getAllExcelDataOfUser, deleteExcelById, getExcelId } from '../APIServices/ExcelApi'
import { getAllChartDataByUser, deleteChartDataByUser, getChartByExcelFile } from '../APIServices/ChartApi'
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
import { RiGalleryView2 } from "react-icons/ri";
import { FaDownload } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

function DashBoard() {
  const [ExcelPreview, setExcelPreview] = useState([]);
  const [selectedExcelId, setSelectedExcelId] = useState(null)
  const [excelData, setExcelData] = useState([])
  const [excelFileName, setExcelFileName] = useState()
  const [excelId, setExcelId] = useState()
  const [chartData, setChartData] = useState([])
  const [chartDataByExcel, setChartDataByExcel] = useState([])
  const [selecteChartType, setSelectedChartType] = useState("")
  const [chartStyle, setChartStyle] = useState('');
  const [showNoChartMsg, setShowNoChartMsg] = useState(false);
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userID")
  const username = window.localStorage.getItem("username")
  const email = window.localStorage.getItem("Email")

  const newUsername = username.trim().split(/\s+/).map(word => word[0].toUpperCase()).join('');
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
      toast.error("Excel Data Fetching failed");
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await getAllChartDataByUser(userId)
      console.log(res.data.chart)
      setChartData(res.data.chart)
    } catch (error) {
      toast.error("Chart Data Fetching failed");
    }
  }

  useEffect(() => {

  }, [])

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
      // fetchChartData()
    } catch (error) {
      toast.error(" fail to delete excel File")
    }
  }

  const handlePreview = async (id) => {
    console.log(id)
    try {
      const res = await getExcelId(id)
      setSelectedExcelId(id)
      // console.log(res.data.excel.ExcelData)
      setExcelPreview(res.data.excel.ExcelData)
    } catch (error) {
      toast.error('fetching failed')
    }
  }

  const showExcelIdRelatedChart = async (id) => {
    console.log(id)
    try {
      const res = await getChartByExcelFile(id)
      setChartDataByExcel(res.data.chart)
      setShowNoChartMsg(res.data.chart.length === 0)
      // console.log(res.data.chart[0])
    } catch (error) {
      toast.error('fetching failed')
    }
  }



  return (
    <div>
      <Navbar />
      <div>
        <div className=' block lg:flex justify-between mr-20 '>
          <div className=' w-[490px] md:w-[600px] lg:w-[250px]  text-center lg:border-2 bg-base-100 border-b-0 h-[200px] lg:h-[700px] mt-16 p-4'>
            <div className='w-[100px]  h-[100px] rounded-full text-center pt-8 text-[24px] ml-48 lg:ml-10 bg-gray-200'>
              <strong>{newUsername}</strong>
            </div>
            <h1 class="px-4 py-2 rounded-lg font-medium
                     bg-base-100 text-base-content/80
                                   hover:bg-base-300 hover:text-black
                             transition-colors duration-150 ml-5 lg:mr-10 text-[12px]">{email}</h1>
            <hr />
            <ul class=" w-96 mt-2 mx-auto lg:w-48 lg:mt-10 lg:space-y-2 flex items-center lg:block">
              <Link to='/chartGallery'><li
                class="px-4 lg:py-2 rounded-lg font-medium
           bg-base-100 text-base-content/80
           hover:bg-base-300 hover:text-black
           transition-colors duration-150  flex  items-center justify-around"
              >
                <FaDownload className='mr-1' />
                Download
              </li></Link>
              <Link to='/chartGallery'><li
                class="px-0  lg:py-2 rounded-lg font-medium
           bg-base-100 text-base-content/80
           hover:bg-base-300 hover:text-black
           transition-colors duration-150  flex items-center  justify-around"
              ><RiGalleryView2 className='mr-1' />
                Charts
              </li></Link>
              <Link to='/uploadExcel'> <li
                class="px-4 lg:py-2 rounded-lg font-medium
           bg-base-100 text-base-content/80
           hover:bg-base-300 hover:text-black
           transition-colors duration-150  flex items-center justify-around"
              ><FaUpload className='mr-1' />
                Upload
              </li></Link>
              <li
                class="px-0 lg:py-2 rounded-lg font-medium
           bg-base-100 text-base-content/80
           hover:bg-base-300 hover:text-black
           transition-colors duration-150 flex  items-center  justify-around"
              ><FaCalendarAlt className='mr-1' />
                Calendar
              </li>
            </ul>

          </div>
          {/* upload file and recent file uploaded */}
          <div >
            <h1 className="text-3xl font-bold mt-28 text text-center ml-16"><span className='text-blue-500'>O</span>ver<span className='text-blue-500'>V</span>iew</h1>
            {/* <div className="stats shadow h-[100px] mt-10 w-[450px]">
            </div> */}
            <div className='w-[350px] sm:w-full md:w-full lg:w-full md:flex lg:flex border-2 ml-20 lg:m-0 p-10 bg-blue-100 rounded-2xl'>
              <div className="stat  ">
                <button className="btn bg-blue-400 w-52 " onClick={() => navigate('/uploadExcel', { state: excelFileName })}    >UPLOAD EXCEL </button>
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
            <div >
            </div>
            {excelData.length > 0 ? (<div className="overflow-x-auto border-2 rounded-lg shadow  mt-28 w-[480px] lg:w-[800px] m-auto">
              <h3 className='text-center font-bold'>Recent file uploaded</h3>
              <table className="table bg-white text-[12px] lg:text-[14px] ">
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
                      <td className="space-y-1 lg:space-x-2 ">
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
            <div className='w-[800px] m-auto  mt-5 '>
              {/* <h1>Excel Preview</h1> */}
              {ExcelPreview.length > 0 && (
                <div className="overflow-x-auto border-2 rounded-[10px]  p-4">
                  <h2 className="text-xl font-semibold mb-3 lg:text-center">Excel File Preview</h2>
                  {/* <button onClick={showExcelIdRelatedChart}>visualize chart</button> */}
                  <table className="table table-zebra  w-[48%] lg:w-full border text-[9px] lg:text-[14px]">
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
                  <div className=' ml-36 lg:ml-0 lg:flex justify-center mt-10  '>
                    <button className="btn btn-accent mr-5 " onClick={() => {
                      setExcelPreview([]);
                      setChartDataByExcel([]);
                      setShowNoChartMsg(false);
                    }}>close</button>
                    <button className="btn btn-accent " onClick={() => showExcelIdRelatedChart(selectedExcelId)}>visualize  </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
              {showNoChartMsg && chartDataByExcel.length === 0 ? (
                <div role="alert" className="alert alert-error place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>No charts found for this Excel file Click <strong>Analyse</strong> first, then come back to Visualize.</span>
                </div>
                //  toast.error(  "No charts found for this Excel file Click <strong>Analyse</strong> first, then come back to Visualize.")
                // <p className="text-center mt-8 italic text-gray-500 m-10" >
                // </p>
              ) : (
                chartDataByExcel.map((chart) => {
                  console.log(chart)
                  const ChartComponent = chartStyles[chart.chartType];
                  if (!ChartComponent) {
                    return (
                      <div key={chart._id}>
                        Invalid chart type: {chart.chartType}
                      </div>
                    );
                  }

                  const data = { labels: chart.labels, datasets: chart.datasets };

                  return (
                    <div key={chart._id} className="bg-white p-4 rounded-xl shadow border-2 ">
                      <h2 className='text-center italic font-bold bg-blue-100 w-32 m-auto'>{chart.chartType}</h2>
                      <h2 className="text-xl font-semibold mb-2">{chart.chartTitle}</h2>
                      <ChartComponent data={data} />
                      {/* <div>
                        <label>Chart Type</label>
                        <select className="select select-bordered w-full" value={chartStyle} onChange={(e) => setChartStyle(e.target.value)} >
                          <option value="">Select</option>
                          {chartStyles.map((style) => (
                            <option key={style} value={style}>{style}</option>
                          ))}
                        </select>
                      </div> */}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default DashBoard