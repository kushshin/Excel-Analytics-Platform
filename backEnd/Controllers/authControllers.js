import express from 'express'
import UserModel from '../Models/authModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const registerUser = async(req,res)=>{
    // console.log(req.body)
    try {
        const{username,email,password} = req.body
        if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

        const user = await UserModel.findOne({username:username})
        if(user)res.status(401).json("user already exists")

            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new UserModel({
                username : username,
                email : email,
                password : hashedPassword
            })

            const savedUser = await newUser.save()
            console.log(savedUser)
            res.status(200).json(savedUser)
            
        } catch (error) {
            
            res.status(401).json('user registration failed')
    }

}

const loginUser = async(req,res)=>{
    console.log(req.body)
    try {
        const{email,password} = req.body
         if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
        // console.log(req.body)
        const user = await UserModel.findOne({email:email})
        // console.log(user)
    
    if (!user || user.role !== 'user')res.status(401).json('user not found')
    
        const isValidPassword = await bcrypt.compare(password ,user.password)
    
        if(!isValidPassword) res.status(500).json("invalid email & password")
    
            const token = jwt.sign({id : user._id, email : user.email, role: user.role, username : user.username},process.env.SECRET_KEY)
    
            res.cookie("Token",token,{secure:true, sameSite:'None'})
            res.status(200).json({userid : user._id , username : user.username, email : user.email , role : user.role})
    } catch (error) {
           res.status(500).json(error , "internal server Error")
    }
}

const Dashboard = (req, res) => {
    // console.log(req.params.id)
    // console.log({user : req.usr.id}e)
    const userdetails =  req.user
    // console.log({u :userdetails})
    if(req.user.id === req.params.id) {
        res.status(200).json({ message: "accessed protected route", username: userdetails.username, email: userdetails.email , role : userdetails.role })
    } else {
        res.status(403).json({ message: "not allowed to enter" })
    }
}



export {registerUser,loginUser,Dashboard}