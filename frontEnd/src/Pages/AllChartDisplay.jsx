import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import {getAllChartData} from '../APIServices/ChartApi'
import { Bar, Doughnut, Line, Pie, PolarArea, Bubble, Scatter, Radar } from 'react-chartjs-2'
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



function AllChartDisplay() {
  const [getAllCharts, setGetAllCharts] = useState([])
  const chartStyles = {
    Bar, Line, Pie, Doughnut,
    Radar,
    PolarArea,
    Bubble,
    Scatter
  };

  const chartDownloadRef = useRef(null)


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
  return (
    <div className='border-red-500'>
      <h2 className="text-xl font-semibold mb-3 mt-10  text-center">Charts Preview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {getAllCharts.map((chart) => {
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

          const downloadPDF = async () => {
    const canvas = chartDownloadRef.current?.canvas; // Get the canvas from the chart
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


          return (

            <div key={chart._id} className="bg-white p-4 rounded-xl shadow border-2">
              <h2 className="text-xl font-semibold mb-2">{chart.chartTitle}</h2>
              <ChartComponent data={chartData} ref={chartDownloadRef} />
              <button onClick={downloadPDF} className='btn bg-blue-500'>download PDF</button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default AllChartDisplay