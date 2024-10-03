const UserModel = require("../models/UserModel")


const getUserController = async (req,res) =>{

     try {
        //find user
        const user = await UserModel.findById({_id:req.body.id})

        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found',
            })
        }

        //hide password
        user.password = undefined;
        // resp
        res.status(200).send({
            success:true,
            message:'user get successfully',
            user,

        })
        
     } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Get User Api',
            error


        })
        
     }
}

const updateUserController = async (req,res) =>{
    try {
        //find user
        const user = await UserModel.findById({_id:req.body.id})

        //Validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        // update
        const {userName,address,phone}= req.body
        if(userName) user.userName =userName
        if(address) user.address = address
        if(phone) user.phone = phone

        // save data
        await user.save()
        res.status(200).send({
            success:true,
            message:'User Updated Successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Update User API',
            error
        })
        
    }

};
//RESET  PASSWORD

const resetPasswordcontroller = async (req,res)=>{

    try {
        const {email,newPassword,answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })

        }
        const user = await UserModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User not found or invalid answer'
            })

        }
         //hashing password
         var salt = bcrypt.genSaltSync(10);
         const hashedPassword =  await bcrypt.hash(newPassword,salt);
         user.password = hashedPassword
         await  user.save();
         res.status(200).send({
            success:true,
            message:'password reset successfully',
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in password reset api',
            error

        })
        
    }


}

//Update  user password
const updatePasswordController = async (req,res) =>{
    try {

        //find user
        const user = await UserModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }

        //get data from user
        const {oldpassword,newPassword} =req.body
        if(!oldpassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"please provide old or new password"
            })
        }
        // check user password | Compare password
const isMatch = await bcrypt.compare(oldpassword,user.password);
if(!isMatch)
{
    return res.status(500).send({
        success: false,
        message: "Invalid old Credentials"
    });
}

 //hashing password
 var salt = bcrypt.genSaltSync(10);
 const hashedPassword =  await bcrypt.hash(oldpassword,salt)
 user.password = hashedPassword
 await user.save();
 res.status(200).send({
    success:true,
    message:"Password Updated!"
 })

    } catch (error) {

        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in password Update api',
            error

        })
        
    }

}

// Delete profile Account
const deleteProfileController = async(req,res) =>{

    try {
        await UserModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Your account has been deleted"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete  Profile API',
            error

        })
    
        
    }

    
}



module.exports = {getUserController,updateUserController,resetPasswordcontroller,updatePasswordController,deleteProfileController}