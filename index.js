const express=require("express")

const {connectionDB}=require("./db")
const { userRoute } = require("./routes/userRoutes")
const {BooksModel}=require("./models/booksModel")
const { bookRouter } = require("./routes/booksRoute")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRoute)
app.use("/",bookRouter)

app.get("/",(req,res)=>{
    try {
        res.status(200).send("home")
    } catch (error) {
        res.status(400).send(error)
    }
})






app.listen(8000,async()=>{
    try {
        await connectionDB
        console.log("Server running in 8000")
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
})