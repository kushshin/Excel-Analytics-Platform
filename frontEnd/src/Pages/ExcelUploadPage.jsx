import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadExcel } from '../APIServices/ExcelApi';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import * as XLSX from 'xlsx';

function ExcelUploadPage() {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [excelId, setExcelId] = useState(null);
  const fileInput = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const fileNames = location.state;

  const handleExcel = (e) => {
    const selectedExcelFile = e.target.files[0];
    const isDuplicate = fileNames?.includes(selectedExcelFile?.name);
    if (isDuplicate) {
      fileInput.current.value = null;
      return toast.error("This file is already uploaded.");
    }
    const fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!selectedExcelFile) return toast.error("No file selected");

    if (!fileTypes.includes(selectedExcelFile.type)) {
      return toast.error("Please select only Excel file types");
    }

    setExcelFile(selectedExcelFile);
  };

  const handleExcelUpload = () => {
    if (!excelFile) return toast.error("No file to upload");
    const reader = new FileReader();
    reader.readAsArrayBuffer(excelFile);

    reader.onload = async (e) => {
      const newFile = e.target.result;
      const workbook = XLSX.read(newFile, { type: 'buffer' });
      const worksheetNew = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetNew];
      const Parseddata = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(Parseddata);

      const formData = new FormData();
      formData.append('file', excelFile);
      try {
        const res = await uploadExcel(formData, { withCredentials: true });
        const id = res.data.excel._id;
        setExcelId(id);
        toast.success('Upload & parse success');
        fileInput.current.value = null;
      } catch (err) {
        toast.error('Upload failed');
      }
    };
  };

  return (
    <div>
      <Navbar />
      <div className='mt-24 px-4'>
        <div className='flex flex-col items-center gap-4'>
          <input
            type="file"
            name='file'
            ref={fileInput}
            className="file-input file-input-bordered file-input-info w-full max-w-md"
            onChange={handleExcel}
          />
          <button className="btn btn-accent w-full max-w-md" onClick={handleExcelUpload}>
            Upload
          </button>
        </div>

        <div className="mt-10 w-full max-w-5xl mx-auto px-2">
          {excelData.length > 0 ? (
            <div className="overflow-x-auto">
              <h2 className="text-xl font-semibold mb-3 text-center">Excel File Preview</h2>
              <table className="table table-zebra w-full text-xs sm:text-sm border">
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
              <div className='flex justify-center mt-6'>
                <button
                  className="btn btn-accent w-full max-w-sm"
                  onClick={() => navigate(`/createChart/${excelId}`)}
                >
                  Analyse Data
                </button>
              </div>
            </div>
          ) : (
            <p className='text-center mt-10'>No data available yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExcelUploadPage;
