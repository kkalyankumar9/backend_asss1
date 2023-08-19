const express=require("express")
const { BooksModel } = require("../models/booksModel")
const { auth } = require("../middleware/auth")
const { UserModel } = require("../models/userModel")

const bookRouter=express.Router()

bookRouter.get("/books",auth,async(req,res)=>{
    try {
        const data=await BooksModel.find({userID:req.body.userID})
        res.status(200).send({"msg":"Get","data":data})
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})

bookRouter.post("/create",auth,async(req,res)=>{
    try {
        const data=new BooksModel(req.body)
        await data.save()
        res.status(200).send({"msg":"Data is added","created_data":data})

        console.log(data)
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})

bookRouter.patch("/update/:bookID",auth,async(req,res)=>{

    const {bookID}=req.params
    const note=await BooksModel.findOne({_id:userID})
    try {
        if(req.body.userID!==note.userID){
            res.send({"msg":"user not Authoried!.."})
        }else{
            await BooksModel.findByIdAndUpdate({_id:bookID},req.body)
            res.send({"msg":"data is updated"})

        }
        
    } catch (error) {
        res.send({"msg":"error"})
    }
    // const {bookID}=req.params

    // try {
        
    //     const updatedData= await BooksModel.findByIdAndUpdate({_id:bookID},req.body)
    //     res.status(200).send({"msg":"Data is Updated","updatedID":bookID})
        
    // } catch (error) {
    //     res.status(400).send({"msg":error})
    // }

})

bookRouter.delete("/delete/:deletId",auth,async(req,res)=>{
    const {deletId}=req.params
    const note=await BooksModel.findOne({_id:userID})
    try {
        if(req.body.userID!==note.userID){
            res.send({"msg":"user not Authoried!.."})
        }else{
            await BooksModel.findByIdAndDelete({_id:deletId})
            res.status(200).send({"msg":"Data is Delete","deletId":deletId})
            console.log(deletId)
        }
    
    } catch (error) {
        res.status(400).send({"msg":error}) 
    }
})

module.exports={bookRouter}