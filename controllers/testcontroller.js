
const testUserController = (req,res) =>{
    try {
        
        res.status(200).send({
            success:true,
            message:"Test User Data api "
        })
    } catch (error) {
        console.log('error In test API ',error)
    }
}

// Login



module.exports=  testUserController