import { Router } from "express";
import upload from "../Utils/ExcelUploadMulter.js";
import { saveChartData,fetchChartDataByUser ,deleteChartData,AllChartData} from "../Controllers/ChartController.js";
import {validationMiddleware} from "../MiddleWare/validationMiddleware.js";
const router = Router()

router.post('/saveChart',validationMiddleware,upload.none(),saveChartData)
router.get('/getAllChartDataByUser/:id',validationMiddleware,fetchChartDataByUser)
router.get('/getAllChartData',AllChartData)
router.delete('/deleteChartDataByUser/:id',validationMiddleware,deleteChartData)

export default router