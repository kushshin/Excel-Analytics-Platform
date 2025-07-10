import React,{useState} from 'react'
import { Link } from 'react-router-dom'


function ExcelDataUpload() {
  return (
    <div>
    
     <div className='flex'>
 <Link to="/uploadExcel"> <button className="btn btn-accent"   >UPLOAD FILE</button></Link>    
  </div>

    </div>
  )
}

export default ExcelDataUpload