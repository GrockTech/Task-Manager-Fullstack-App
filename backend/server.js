import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import {cors} from "cors"
import cors from "cors"
import taskRoutes from "./routes/task.js"
const app = express()
import userRoute from "./routes/user.js"

const PORT = 5000  || process.env.MONGO_URL

dotenv.config()



const connect = async () =>{

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB connected")
        
    } catch (error) {
        console.log("mongoDB couldnt connect")
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected successfuly")
})

app.get("/", (req, res)=>{
    res.send("it working")
})

// middlewares
app.use(express.json()) 
app.use(cors())


// routes 
app.use("/api", taskRoutes)
app.use("/api", userRoute)

app.listen(PORT, ()=>{
    connect()
    console.log(`server is running on ${PORT}`)
    })