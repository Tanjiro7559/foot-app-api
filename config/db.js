const mongoose= require("mongoose");
const colors = require("colors")

//function for mongodb database connection  
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to Database ${mongoose.connection.host}`.bgCyan)
        
    } catch (error) {
        console.log("DB Error",error,colors.bgRed);
    }
}

module.exports= connectDB;