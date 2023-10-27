const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectDB = require('./db/connectDB')
const fileUpload = require("express-fileUpload")
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors())
//for getting the token
app.use(cookieParser())
//for fil upload
app.use(fileUpload({useTempFiles:true}));



//for getting data
app.use(express.json())
connectDB()


//load router
app.use('/api',web)


















//server create
app.listen(process.env.PORT,()=>{
    console.log(`Server running on localhost:${process.env.PORT}`)
})

