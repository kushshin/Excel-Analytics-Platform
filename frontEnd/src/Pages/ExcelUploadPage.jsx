import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { uploadExcel } from '../APIServices/ExcelApi';
import axios from 'axios'
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import * as XLSX from 'xlsx';
import AllChartDisplay from './AllChartDisplay';

function ExcelUploadPage() {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [excelId, setExcelId] = useState(null)
  const fileInput = useRef()
  const navigate = useNavigate()

  
 const location = useLocation()
const fileNames = location.state
console.log(fileNames)

  const handleExcel = (e) => {
    const selectedExcelFile = e.target.files[0]
const isDuplicate = fileNames?.includes(selectedExcelFile.name);
console.log(isDuplicate)
  if (isDuplicate) {
    fileInput.current.value = null
    return toast.error("This file is already uploaded.");
  }
    const fileTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
    if (!selectedExcelFile) return toast.error("no file selected");

    if (!fileTypes.includes(selectedExcelFile.type)) {
      return toast.error("please select only excel file types")
    }

    setExcelFile(selectedExcelFile)
  };

  const handleExcelUpload = () => {
    if (!excelFile) return toast.error("no file to upload")
    const reader = new FileReader();
    reader.readAsArrayBuffer(excelFile);

    reader.onload = async (e) => {
      const newFile = e.target.result;
      const workbook = XLSX.read(newFile, { type: 'buffer' })
      const worksheetNew = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetNew]
      const Parseddata = XLSX.utils.sheet_to_json(worksheet)
      setExcelData(Parseddata)
     

      const formData = new FormData();
      formData.append('file', excelFile);
      try {
        const res = await uploadExcel(formData, { withCredentials: true });
        console.log(res.data.excel.filename)
        const id = res.data.excel._id
        setExcelId(id)
        // console.log(excelId)
        toast.success('Upload & parse success');
        fileInput.current.value = null

      } catch (err) {
        toast.error('Upload failed');
      }
    }
  }

 
 




  return (
    <div>
      <Navbar />
      <div className='flex h-[250px] mt-20 justify-center items-center'>
        <input type="file" name='file' ref={fileInput} className="  file-input file-input-bordered file-input-info w-[700px] " onChange={handleExcel} />
        <button className="btn btn-accent ml-4" onClick={handleExcelUpload}>UPLOAD</button>

      </div>
      <div>
        <div className="p-4 w-[900px] m-auto">
          {excelData.length > 0 ? (
            <div className="overflow-x-auto ">
              <h2 className="text-xl font-semibold mb-3 text-center">Excel File Preview</h2>
              <table className="table table-zebra w-full border">
                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key} className="border px-2 py-1 bg-gray-100">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, index) => (
                        <td key={index} className="border px-2 py-1">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex justify-center mt-10'>
              <button className="btn btn-accent " onClick={() => navigate(`/createChart/${excelId}`)}>Analyse Data</button>
              </div>
            </div>
          ) : (
            <p className='text-center'>No data available yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ExcelUploadPage