const TourFun = require('../models/tourfunBooking');

exports.addNewBooking = async (req, res) => {
    try {

         var data = req.body;
         const find=await TourFun.findOne({email:data.email,status:"pending"})
         if(find){
            return res.status(400).json("Pending Booking found!")
         }
        var doc = await new TourFun(data).save()
         res.status(200).json(doc)
        
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.findAllBooking = async (req, res) => {
    try {

         const find=await TourFun.find().sort({date:-1})
         res.status(200).json(find)
        
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateBooking = async (req, res) => {
    try {
        
         const find=await TourFun.findByIdAndUpdate({_id:req.params.id},req.body)
         res.status(200).json(find)
        
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}