
const   resturatModel = require("../models/resturatModel")
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
        const newResturant = await resturatModel({
            title,
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
        coords
        })

        await newResturant.save()
        res.status(200).send({
            success:true,
            message:"New resturant created"
        })
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error In create Resturant api',
        error
    })
    
}


};

// GET All RESTAURANT

 const getAllResturant = async(req,res) =>{
try {

    const resturant =  await resturatModel.find({})
    if(!resturant){
        return res.status(404).send({
            success:false,
            message:'No Restaurant Available'
        })
    }
    res.status(200).send({
        success:true,
        totalcount:resturant.length,
        resturant
    })
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error In all  Resturant api',
    })
    
}


 };

 // Get Resturant by ID
 const getResturantByrdController = async(req,res)=>{
    try {

        const resturantid=req.params.id
        //find resturant
        const resturant  = await resturatModel.findById(resturantid)
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:'No resturant found'
            })
        }
        res.status(200).send({
            success:true,
            resturant
        })
        
    } catch (error) {
        console.log(error);
    res.status(500).send({
        success:false,
        message:'Error In get Resturant  by id api',
    })
        
    }


 }


module.exports = {createResturantController,getAllResturant,getResturantByidController: getResturantByrdController}