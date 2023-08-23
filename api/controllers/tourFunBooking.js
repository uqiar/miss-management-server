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
