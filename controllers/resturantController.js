
const  t resturatModel = require("../models/resturatModel")
// Create Restaurant 
const createResturantController = async(req,res) =>{

try {

    const {title,
        imageUrl,
        food,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords}=req.body

        // validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'Please provide title and and address'
            })
        }
        const newResturant = await resturatModel
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error In create Resturant api',
        error
    })
    
}


};

module.exports = {createResturantController}