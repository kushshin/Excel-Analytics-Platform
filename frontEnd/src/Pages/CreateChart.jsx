import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import {getExcelId} from '../APIServices/ExcelApi'
import {saveChart} from '../APIServices/ChartApi'
import { Bar, Line, Pie,Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter, } from 'react-chartjs-2';
import toast from 'react-hot-toast';
import axios from 'axios';

function CreateChart() {
  const [excelXaxis, setExcelXaxis] = useState('');
  const [excelYaxis, setExcelYaxis] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const [chartStyle, setChartStyle] = useState('');

  const { id } = useParams();
  const chartStyles = ['Bar', 'Line', 'Pie','Doughnut',
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
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Build Your Chart</h2>

        <div className="flex gap-4 mb-6">
          <div>
            <label>X-Axis</label>
            <select className="select select-bordered w-full" onChange={(e) => setExcelXaxis(e.target.value)}>
              <option value="">Select</option>
              {excelHeadings.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Y-Axis</label>
            <select className="select select-bordered w-full" multiple onChange={(e) => {
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
            <label>Chart Type</label>
            <select className="select select-bordered w-full" value={chartStyle} onChange={(e) => setChartStyle(e.target.value)}>
              <option value="">Select</option>
              {chartStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>

        {excelXaxis && excelYaxis.length > 0 && chartStyle && (
          <div className="max-w-3xl">
            {chartStyle === 'Bar' && <Bar data={chartDetails} />}
            {chartStyle === 'Line' && <Line data={chartDetails} />}
            {chartStyle === 'Pie' && <Pie data={chartDetails} />}
            {chartStyle === 'Doughnut' && <Doughnut data={chartDetails} />}
            {chartStyle === 'Radar' && <Radar data={chartDetails} />}
            {chartStyle === 'PolarArea' && <PolarArea data={chartDetails} />}
            {chartStyle === 'Bubble' && <Bubble data={chartDetails} />}
            {chartStyle === 'Scatter' && <Scatter data={chartDetails} />}
            <button className="btn btn-accent mt-4" onClick={saveTodataBase}>SAVE CHART</button> 
 
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CreateChart;