import { Router } from "express";
import { Adminlogin,AllUserData,AllExcelData,AllChartData } from "../Controllers/adminController.js";
import {adminValidationMiddleware} from "../MiddleWare/validationMiddleware.js";
const router = Router()


router.get('/allUsers', adminValidationMiddleware,AllUserData)
router.get('/AllExcels',adminValidationMiddleware,AllExcelData)
router.get('/AllCharts',adminValidationMiddleware,AllChartData)
router.post('/adminlogin',adminValidationMiddleware,Adminlogin)
// router.get('/Dashboard/:id', adminValidationMiddleware , Dashboard)


export default router