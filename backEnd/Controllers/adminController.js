import express from 'express'
import cookieParser from 'cookie-parser'
import UserModel from '../Models/authModel.js';
import ExcelDataModel from '../Models/ExcelDataModel.js'
import chartDataModel from '../Models/chartDataModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




const Adminlogin = async(req,res)=>{
    console.log(req.body)
    try {
        const{email,password} = req.body
        // console.log(req.body)
        const user = await UserModel.findOne({email})
        // console.log(user)
    
    if (!user || user.role !== 'admin')res.status(401).json('invalid email')
    
        const isValidPassword = await bcrypt.compare(password ,user.password)
    
        if(!isValidPassword) res.status(500).json("invalid email & password")
    
            const admintoken = jwt.sign({id : user._id, role : user.role, email : user.email , username : user.username },process.env.ADMIN_SECRET_KEY)
    
            res.cookie("adminToken",admintoken)
            res.status(200).json({userid : user._id , email : user.email ,role : user.role, username : user.username})
    } catch (error) {
           res.status(500).json(error , "internal server Error")
    }
}


const AllUserData = async(req,res)=>{
    try {
        const allUser = await UserModel.find()
        res.status(200).json(allUser)
    } catch (error) {
      res.status(500).json(error,"no user found")   
    }
}

const AllExcelData = async(req,res)=>{
    try {
        const allExcelData = await ExcelDataModel.find()
        res.status(200).json(allExcelData)
    } catch (error) {
      res.status(500).json(error,"no excel found")   
    }
}
const AllChartData = async(req,res)=>{
    try {
        const allChartData = await chartDataModel.find()
        res.status(200).json(allChartData)
    } catch (error) {
      res.status(500).json(error,"no excel found")   
    }
}



export {Adminlogin,AllUserData,AllExcelData,AllChartData}