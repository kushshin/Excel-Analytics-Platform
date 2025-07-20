import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import {getAllChartData,deleteChartDataByChartId} from '../APIServices/ChartApi'
import { Bar, Doughnut, Line, Pie, PolarArea, Bubble, Scatter, Radar } from 'react-chartjs-2'
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Cookie from 'js-cookie'



function AllChartDisplay() {
  const [getAllCharts, setGetAllCharts] = useState([])
  const chartStyles = {
    Bar, Line, Pie, Doughnut,
    Radar,
    PolarArea,
    Bubble,
    Scatter
  };

    const username = window.localStorage.getItem("username")
     const userId = window.localStorage.getItem("userID")
  const chartDownloadRef = useRef({})
   const token = Cookie.get('Token')
   const Atoken = Cookie.get('adminToken')


  const getAllExcelData = async () => {
    try {
      const res = await getAllChartData()
      // console.log(res.data.chart)
      setGetAllCharts(res.data.chart)
    } catch (error) {
      toast.error({ error: 'data fetching failed' })
    }
  }

  useEffect(() => {
    getAllExcelData()
  }, [])


  const deleteChart = async(id)=>{
    try {
     await deleteChartDataByChartId(id)     
     getAllExcelData()
    } catch (error) {
       toast.error({ error: 'chart deletion failed' })
    }
  }

  return (
    <div className='border-red-500'>
      <h2 className="text-xl font-semibold mb-3 mt-10 ml-40 lg:ml-0 lg:text-center">Charts Preview</h2>
      <div className="w-[480px] md:w-full lg:w-full grid grid-cols md:grid-cols-2 gap-4 p-1">
        {getAllCharts.map((chart) => {
          // console.log(chart.uploadedBy)
          const ChartComponent = chartStyles[chart.chartType];
          if (!ChartComponent) return <div key={chart._id}>Invalid chart type: {chart.chartType}</div>;
          const chartData = {
            labels: chart.labels,
            datasets: chart.datasets,
          };

          // const downloadChart = () => {
          //   if (!chartDownloadRef.current) return;
          //   const url = chartDownloadRef.current.toBase64Image();
          //   const link = document.createElement('a');
          //   link.href = url;
          //   link.download = `${chart.chartTitle || 'chart'}.png`;
          //   link.click();
          // }

          const downloadPDF = async (chartId) => {
    const chart = chartDownloadRef.current[chartId];
    const canvas = chart?.canvas
    if (!canvas) return;

    const canvasImage = await html2canvas(canvas); // convert canvas to image
    const imageData = canvasImage.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('chart.pdf');
  };

  const downloadPNG = (chartId) => {
  const chart = chartDownloadRef.current[chartId];
 if (!chart) return;

  // 1. Get the original canvas
  const src = chart.canvas;
  const { width, height } = src;

  // 2. Draw onto a temp canvas with a white background
  const dest = document.createElement('canvas');
  dest.width = width;
  dest.height = height;
  const ctx = dest.getContext('2d');

  ctx.fillStyle = '#ffffff';      // your desired background
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(src, 0, 0);

  // 3. Export that temp canvas
  const base64 = dest.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = base64;
  link.download = `${chart.options?.plugins?.title?.text || 'chart'}.png`;
  link.click();
};


          return (

            <div key={chart._id} className="bg-white p-4 rounded-xl shadow border-2">
              <h2 className="text-xl font-semibold mb-2">{chart.chartTitle}</h2>
              <div className='flex justify-between '>
              {chart.uploadedBy === userId ?      <h2 className="italic ">{username}</h2> : ""}
             {chart.uploadedBy === userId ?   <img src="/img/trash.png" alt="" className='w-5 h-5 cursor-pointer'  onClick={()=>deleteChart(chart._id)}/>: ""}
              </div>
              <ChartComponent data={chartData}  ref={el => (chartDownloadRef.current[chart._id] = el)} />
                {token || Atoken ? 
                <div>
              <button onClick={()=>downloadPDF(chart._id)} className='btn bg-blue-400'>Export PDF</button>
              <button onClick={()=>downloadPNG(chart._id)} className='btn bg-blue-400'>download PNG</button>
                </div> :  <div>
              <button onClick={()=> toast.error("signup/signIn for download")} className='btn bg-blue-400'>Export PDF</button>
              <button onClick={()=> toast.error("signup/signIn for download")} className='btn bg-blue-400'>download PNG</button>
                </div>}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default AllChartDisplay