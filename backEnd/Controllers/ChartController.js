import express from 'express';
// import ExcelModel from "../Models/ExcelDataModel.js";
import Chart from '../Models/chartDataModel.js'
import xlsx from 'xlsx'
import path from 'path';
import fs from 'fs';

const saveChartData = async (req, res) => {
  // console.log({files:req.file.size})
  // console.log({usersss :req.user.id})
 
  try {
    const userId = req.user.id;
  
//     const filesize = req.file.size;
//     const workbook = xlsx.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const newData = xlsx.utils.sheet_to_json(sheet);

//   const newExcelDoc = new ExcelModel({
//   fileName: req.file.originalname,
//   uploadedBy: userId,
//   fileSize: filesize,
//   ExcelData: newData,
// });

// const newExcel = await newExcelDoc.save();

    const chartDetails = JSON.parse(req.body.chartDetails);
// console.log(chartDetails)
    const newChartDoc =  new Chart({
      ...chartDetails,
      uploadedBy: userId,
      excelFileId : chartDetails.excelFileId,
    });

    const newChart= await newChartDoc.save();

    // fs.unlinkSync(req.file.path);

    res.status(201).json({ chart: newChart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving chart and Excel' });
  }
};


const fetchChartDataByUser =async(req,res)=>{
   const userId = req.params.id
  try {
    const getChartData = await Chart.find({ uploadedBy: userId })
    // console.log(getChartData)
    res.status(200).json({ msg: 'Fetched user chart data', chart: getChartData });
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
};

const getChartByExcelFile =async(req,res)=>{
  // console.log(req.params.id)
  try {
    const chartByExcelFile = await Chart.find({excelFileId : req.params.id})
      res.status(200).json({ msg: 'Fetched chart by excelfile', chart: chartByExcelFile });
  } catch (error) {
       res.status(500).json({ msg: 'Upload failed'});
  
  }
}


const AllChartData=async(req,res)=>{
  try {
const AllChart = await Chart.find()
   res.status(200).json({ msg: 'Fetched all chart data', chart: AllChart });
  } catch (error) {
      res.status(500).json({ msg: 'chart fetching failed',});
  }
}


const deleteChartData = async(req,res)=>{
  const excelId = req.params.id
  try {
     await Chart.findOneAndDelete({ excelFileId : excelId })
      res.status(200).json({ msg: ' chart deleted' });
  } catch (error) {
      res.status(500).json({ msg: 'Upload failed' });
  }
}

const deleteChartDataByChartId = async(req,res)=>{
  try {
    await Chart.findOneAndDelete({ _id :  req.params.id })
      res.status(200).json({ msg: ' chart deleted' });
  } catch (error) {
      res.status(500).json({ msg: 'Upload failed' });
  }
}

export { saveChartData,fetchChartDataByUser,deleteChartData,AllChartData,getChartByExcelFile,deleteChartDataByChartId}