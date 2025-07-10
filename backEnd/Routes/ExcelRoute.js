import { Router } from "express";
import upload from '../Utils/ExcelUploadMulter.js';
import { AllExcelDataOfUser ,ExcelData,ExcelId,DeleteExcelData } from "../Controllers/ExcelController.js";
import {validationMiddleware} from "../MiddleWare/validationMiddleware.js";
const router = Router()

router.post('/upload', validationMiddleware, upload.single('file'), ExcelData)
router.get('/ExcelId/:id',validationMiddleware, ExcelId)
router.get('/getAllExcelDataOfUser/:id',validationMiddleware, AllExcelDataOfUser)
router.delete('/deleteExcel/:id',validationMiddleware, DeleteExcelData)

export default router