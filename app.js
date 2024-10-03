const express = require('express')
const colors= require("colors")
const cors = require("cors")
const morgan = require("morgan")
const dotenv=require("dotenv")
const connectDB = require('./config/db')


//dot env configuration
dotenv.config();

//rest  object 
const app= express()

//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

// DB Connection
connectDB();


//route
app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/test',require('./routes/authRoutes'));
app.use('/api/v1/test',require('./routes/userRoute'));
app.use('/api/v1/test',require('./routes/resturantRoutes'));

app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Welcome to food server created By Anand</h1 >")
})

//Port
const PORT=process.env.PORT || 8080

hellow

//listen
app.listen(PORT,()=>{
    console.log(`Server Running  on ${PORT}`.white.bgMagenta)
}) 