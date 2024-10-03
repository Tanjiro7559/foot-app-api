const UserModel = require("../models/UserModel");

const bcrypt = require("bcryptjs")

const JWT = require('jsonwebtoken')

//Register controller
const registerController = async (req,res) =>{
    try {
        const {userName,email,password,phone,address,answer} =req.body;
        // validation
        if(!userName || !email || !password || !phone || !address || !answer){
            return res.status(500).send({
                success:false,
                message:"Please provides all Fields"
                
            })
        }


        //check user
        const exisiting  = await UserModel.findOne({email})
        if(exisiting){
            return res.status(500).send({
                success:false,
                message:'email is already register  please login again'
            });
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword =  await bcrypt.hash(password,salt)
        // create new user
        const user  = await UserModel.create({
            userName,
            email,
            password:  hashedPassword,
            address,
            phone,
            answer

        })
        res.status(201).send({
            success:true,
            message:"Successfully Registration",
            user,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            message:"Error in registration api",
            error
        })
        
    }


}



// Login 
const logincontroller = async (req,res) =>{
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please provide Email or password"
            })

        }


        //check user
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found "
            })
        }
        
// check user password | Compare password
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch)
{
    return res.status(500).send({
        success: false,
        message: "Invalid Credentials"
    });
}

// token
const token =  JWT.sign({id:user._id}, process.env.JWT_SECRET,{
        expiresIn:'7d'
})


 //user.password = undefined;


        res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login api",error
        })
        
        
    }

}




module.exports = {registerController , logincontroller}