import express from 'express';
const app = express();
import dotenv from 'dotenv'
import authRouter from './Routes/authRoute.js'
import excelRouter from './Routes/ExcelRoute.js'
import chartRouter from './Routes/chartRoute.js'
import adminRouter from './Routes/adminRoute.js'
import cors from 'cors';
import mongoose from 'mongoose';
import DBconnection from './DBconnection.js';
import cookieParser from 'cookie-parser';

dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(
    { origin: true,
        credentials: true
    }))



    app.use('/api/auth', authRouter)
    app.use('/api/excel', excelRouter)
    app.use('/api/chart', chartRouter)
    app.use('/api/admin', adminRouter)
    
//    app.get("/check-token", (req, res) => {
//   console.log("Token from cookie:", req.cookies.Token);
//   res.send("Check terminal for cookie token.");
// });
    
    DBconnection()





app.listen(PORT,()=>{
console.log(`server is running on ${PORT}`)
})