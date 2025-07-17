import { Router } from "express";
import { Adminlogin,AllUserData,AllExcelData,AllChartData,adminExcelDelete,adminChartDelete,adminUserDelete } from "../Controllers/adminController.js";
import {adminValidationMiddleware} from "../MiddleWare/validationMiddleware.js";
const router = Router()


router.get('/allUsers', adminValidationMiddleware,AllUserData)
router.get('/AllExcels',adminValidationMiddleware,AllExcelData)
router.get('/AllCharts',adminValidationMiddleware,AllChartData)
router.delete('/DeleteExcelById/:id',adminValidationMiddleware,adminExcelDelete)
router.delete('/DeleteChartById/:id',adminValidationMiddleware,adminChartDelete)
router.delete('/DeleteUserById/:id',adminValidationMiddleware,adminUserDelete)
router.post('/adminlogin',Adminlogin)
// router.get('/Dashboard/:id', adminValidationMiddleware , Dashboard)


export default router