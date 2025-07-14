import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getExcelId } from '../APIServices/ExcelApi'
import { saveChart } from '../APIServices/ChartApi'
import Chart3D from '../Components/Bar3DChart';
import PieChart3D from '../Components/Pie3DChart';
import {
  Bar, Line, Pie, Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter,
} from 'react-chartjs-2';
import toast from 'react-hot-toast';
import axios from 'axios';

function CreateChart() {
  const [excelXaxis, setExcelXaxis] = useState('');
  const [excelYaxis, setExcelYaxis] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const [chartStyle, setChartStyle] = useState('');
  const [chart3DType, setChart3DType] = useState('');

  const { id } = useParams();

  const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56',
    '#4BC0C0', '#9966FF', '#FF9F40',
  ];
  const chart3DStyle = ['ThreeJS-Bar', 'ThreeJS-Pie'];
  const chartStyles = ['Bar', 'Line', 'Pie', 'Doughnut',
    'Radar',
    'PolarArea',
    'Bubble',
    'Scatter',];

  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
  ];

  useEffect(() => {
    const fetchExcelDataById = async () => {
      try {
        const res = await getExcelId(id);
        setExcelData(res.data.excel.ExcelData);
        // toast.success('Data fetched successfully');
      } catch (error) {
        console.error(error);
        toast.error('Data fetching failed');
      }
    };
    fetchExcelDataById();
  }, [id]);

  const saveTodataBase = async () => {

    const chartDetails = {
      title: `${excelYaxis} vs ${excelXaxis}`,
      chartType: chartStyle,
      labels: excelData.map((value) => value[excelXaxis]),
      datasets: excelYaxis.map((yKey, index) => ({
        label: `${yKey} vs ${excelXaxis}`,
        data: excelData.map((value) => value[yKey]),
        backgroundColor: backgroundColors[index % backgroundColors.length]
      })),
      excelFileId: id
    };

    const formData = new FormData();
    formData.append('chartDetails', JSON.stringify(chartDetails));

    try {
      const res = await saveChart(formData);
      toast.success('Chart saved successfully');
    } catch (err) {
      console.error(err);
      toast.error('Chart save failed');
    }
  };

  if (!excelData) return <div className="p-4">Loading Excel data...</div>;

  const excelHeadings = Object.keys(excelData[0]);
  const labels = excelData.map((row) => row[excelXaxis]);
  const chartDetails = {
    labels: excelData.map((value) => value[excelXaxis]),
    datasets: excelYaxis.map((yKey, index) => ({
      label: `${yKey} vs ${excelXaxis}`,
      data: excelData.map((value) => value[yKey]),
      backgroundColor: backgroundColors[index % backgroundColors.length]
    }))
  };

  return (
    <div>
      <Navbar />
        <h2 className="text-xl font-bold mt-24 text-blue-500 italic text-center">Build Your Chart</h2>
      <div className=" flex p-2 mt-10  border-2    rounded-lg mb-6 m-auto w-[90%] ">

        {/* <div className="  mt-2 p-2  border-2">
          <div>
            <label>X-Axis</label>
            <select className="select select-bordered " onChange={(e) => setExcelXaxis(e.target.value)}>
              <option value="">Select</option>
              {excelHeadings.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Y-Axis</label>
            <select className="select select-bordered " multiple onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setExcelYaxis(selected);
            }}>
              <option value="">Select</option>
              {excelHeadings.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div>
            <label>2D Chart </label>
            <select className="select select-bordered " value={chartStyle} onChange={(e) => setChartStyle(e.target.value)}>
              <option value="">Select</option>
              {chartStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
          <div>
            <label>3D Chart </label>
            <select className="select select-bordered" value={chart3DType} onChange={e => setChart3DType(e.target.value)}>
              <option value="">Select</option>
              {chart3DStyle.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div> */}
     
<div className="mt-1 mr-4 p-6 bg-white shadow-lg rounded-2xl ring-1 ring-slate-200
                dark:bg-slate-800 dark:ring-slate-700">
  <h3 className="text-lg italic bg-gray-400 text-center rounded-lg font-semibold text-slate-700 mb-4 dark:text-slate-200">
    Chart Configuration
  </h3>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


    <div className="flex flex-col">
      <label className="mb-1 font-medium text-sm text-center text-slate-600 dark:text-slate-300">
        X‑Axis
      </label>
      <select
        className="select select-bordered w-full bg-slate-50 dark:bg-slate-700
                   focus:ring-2 focus:ring-accent/60"
        value={excelXaxis}
        onChange={e => setExcelXaxis(e.target.value)}
      >
        <option value="">Select</option>
        {excelHeadings.map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-sm text-center text-slate-600 dark:text-slate-300">
        Y‑Axis
      </label>
      <select
        multiple
        className="select select-bordered w-full h-32 bg-slate-50 dark:bg-slate-700
                   focus:ring-2 focus:ring-accent/60"
        value={excelYaxis}
        onChange={e =>
          setExcelYaxis(Array.from(e.target.selectedOptions, o => o.value))
        }
      >
        {excelHeadings.map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col">
      <label className="mb-1 font-medium text-sm text-center text-slate-600 dark:text-slate-300">
        2‑D Chart
      </label>
      <select
        className="select select-bordered w-full bg-slate-50 dark:bg-slate-700
                   focus:ring-2 focus:ring-accent/60"
        value={chartStyle}
        onChange={e => setChartStyle(e.target.value)}
      >
        <option value="">Select</option>
        {chartStyles.map(style => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col">
      <label className="mb-1 font-medium text-sm text-center text-slate-600 dark:text-slate-300">
        3‑D Chart
      </label>
      <select
        className="select select-bordered w-full bg-slate-50 dark:bg-slate-700
                   focus:ring-2 focus:ring-accent/60"
        value={chart3DType}
        onChange={e => setChart3DType(e.target.value)}
      >
        <option value="">Select</option>
        {chart3DStyle.map(style => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>


        {excelXaxis && excelYaxis.length > 0 && chartStyle ? (
          <div className="w-[80%]">
            {chartStyle === 'Bar' && <Bar data={chartDetails} />}
            {chartStyle === 'Line' && <Line data={chartDetails} />}
            {chartStyle === 'Pie' && <Pie data={chartDetails} />}
            {chartStyle === 'Doughnut' && <Doughnut data={chartDetails} />}
            {chartStyle === 'Radar' && <Radar data={chartDetails} />}
            {chartStyle === 'PolarArea' && <PolarArea data={chartDetails} />}
            {chartStyle === 'Bubble' && <Bubble data={chartDetails} />}
            {chartStyle === 'Scatter' && <Scatter data={chartDetails} />}

            {chart3DType === 'ThreeJS-Bar' && (<div className="h-[600px] w-full"><Chart3D labels={labels} values={excelData.map(r => r[excelYaxis[0]])}
              colors={COLORS}
            />
            </div>
            )}
            {chart3DType === 'ThreeJS-Pie' && (<div className="h-[600px] w-full"><PieChart3D
              labels={labels}
              values={excelData.map(r =>(r[excelYaxis[0]]))}
              colors={COLORS}
            />
            </div>
            )}
            <button className="btn btn-accent mt-4" onClick={saveTodataBase}>SAVE CHART</button>
            {/* '3D-Scatter', '3D-Bar', '3D-Surface', */}
          </div>
        ) : (<div
  className="hero min-h-screen rounded-xl overflow-hidden"
  style={{
    backgroundImage:
      "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold"><span className='text-blue-500'>H</span>ello <span className='text-blue-500'>T</span>here</h1>
      <p className="mb-5 text-white italic font-semibold">
        Upload your data, pick an axis—watch insights come to life in beautiful 2‑D and interactive 3‑D charts.  
  No coding required, just instant analytics at the click of a button.
      </p>
      {/* <button className="btn btn-primary">Get Started</button> */}
    </div>
  </div>
</div>)}
      </div>
      <Footer />
    </div>
  );
}

export default CreateChart;