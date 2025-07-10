import express from 'express';
import ExcelModel from "../Models/ExcelDataModel.js";
import xlsx from 'xlsx'
import path from 'path';
import fs from 'fs';
import { get } from 'http';


const ExcelData=async(req,res)=>{
 try {
    const userId = req.user.id;
      const filesize = req.file.size;
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const newData = xlsx.utils.sheet_to_json(sheet);

  const newExcelDoc = new ExcelModel({
  filename: req.file.originalname,
  uploadedBy: userId,
   fileSize: filesize,
  ExcelData: newData,
});

const newExcel = await newExcelDoc.save();

    fs.unlinkSync(req.file.path);

    res.status(200).json({ msg: 'Fetched all excel data', excel: newExcel});
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
}

const ExcelId = async (req, res) => {
  // console.log( req.params.id)
      try {
    const getExcelDataById = await ExcelModel.findById(req.params.id)
    if (!getExcelDataById) return res.status(404).json({ message: "Excel not found" });
    res.status(200).json({ msg: 'Fetched all excel data', excel: getExcelDataById });
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
};


const AllExcelDataOfUser = async (req, res) => {
 const userId = req.params.id
  try {
    const getAllExcelData = await ExcelModel.find({ uploadedBy: userId })
    // console.log(getAllExcelData)
    res.status(200).json({ msg: 'Fetched excel data of  user', excel: getAllExcelData });
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
};


const DeleteExcelData= async (req, res) => {
 const userId = req.params.id
  try {
    await ExcelModel.findByIdAndDelete( userId )
    // console.log(getAllExcelData)
    res.status(200).json({ msg: 'deleted  excel data'});
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
};




export {AllExcelDataOfUser,ExcelData,ExcelId,DeleteExcelData}