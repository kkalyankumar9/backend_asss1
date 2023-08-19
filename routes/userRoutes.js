const express=require("express")
const { UserModel } = require("../models/userModel")
const bcrypt = require('bcrypt');
const userRoute=express.Router()
const jwt=require("jsonwebtoken")
userRoute.post("/register",(req,res)=>{
  const {name,email,password}=req.body

    try {
        bcrypt.hash(password, 3, async(err, hash) =>{
            // Store hash in your password DB.
            if(hash){
                data=new UserModel({name,email,password:hash})
                await data.save()
                res.status(200).send({"msg":"Registed successfully on user","Userdata":data})

            }else{
                res.status(400).send({"msg":"check the user details"})
            }
        });
        
    } catch (error) {
        console.log(error)
    }

})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token = jwt.sign({ userID:user._id,user:user.name }, 'end');
                    res.status(200).send({"msg":"Login Successfully","Token":token})
             
                }else{
                    res.status(400).send({"msg":"check the password"})
                }
            });
        }
        
    } catch (error) {
        console.log(error)
    }
})

module.exports={userRoute}