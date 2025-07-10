import { Router } from "express";
import { registerUser,loginUser,Dashboard } from "../Controllers/authControllers.js";
import { Adminlogin } from "../Controllers/adminController.js";
import {validationMiddleware} from "../MiddleWare/validationMiddleware.js";
const router = Router()


router.post('/register',registerUser)
router.post('/login',loginUser)
// router.post('/adminlogin',Adminlogin)
// router.get('/Dashboard/:id', validationMiddleware , Dashboard)


export default router