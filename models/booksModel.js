const mongoose=require("mongoose")

const booksSchema=mongoose.Schema({

    title:String,
    body:String,
    userID:String,
    user:String
},{
    Versionkey:false
})

const BooksModel=new mongoose.model("booksData",booksSchema)

module.exports={BooksModel}