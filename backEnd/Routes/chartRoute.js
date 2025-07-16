import { Router } from "express";
import upload from "../Utils/ExcelUploadMulter.js";
import { saveChartData,fetchChartDataByUser ,deleteChartData,AllChartData,getChartByExcelFile,deleteChartDataByChartId} from "../Controllers/ChartController.js";
import {validationMiddleware} from "../MiddleWare/validationMiddleware.js";
const router = Router()

router.post('/saveChart',validationMiddleware,upload.none(),saveChartData)
router.get('/getAllChartDataByUser/:id',validationMiddleware,fetchChartDataByUser)
router.get('/getChartByExcelId/:id',validationMiddleware,getChartByExcelFile)
router.get('/getAllChartData',AllChartData)
router.delete('/deleteChartDataByUser/:id',validationMiddleware,deleteChartData)
router.delete('/deleteChartDataByChartId/:id',validationMiddleware,deleteChartDataByChartId)

export default router