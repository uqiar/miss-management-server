const TourFun = require('../models/tourfunBooking');
const { sendMail }=require("../../sendEtourfunEmail")

exports.addNewBooking = async (req, res) => {
    try {

         var data = req.body;
         const find=await TourFun.findOne({email:data.email,status:"pending"})
         if(find){
            return res.status(400).json("Pending Booking found!")
         }
        var doc = await new TourFun(data).save()
        sendMail(
            data.email,
            "Pending Booking",
            `
            Dear ${data.name},
            <br>
            <br>
            I hope this email finds you well. We greatly appreciate your interest in booking with 
            us. We are writing to inform you that your booking request is currently pending confirmation.
            <br>
            To finalize your booking and confirm your reservation, we will be giving you a call shortly.
             <br>
             <br>
            Best regards,
            <br>
            Emirates Tour Fun
            `
        )
        sendMail(
            "etourfun@gmail.com",
            "New Tour Fun Booking",
            `
            Package Name: ${data.packageName}
            <br>
            Package Price: ${data.packagePrice}
            <br>
            Total Persons: ${data.numberOfPeople}
            <br>
            Total Amount: ${data.totalAmount}
            <br>
            Name: ${data.name}
            <br>
            Phone Number: ${data.phone}
            <br>
            Location: ${data.location}
            `
        )
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

         if(req?.body?.status=="approved"){
            const currentUser=await TourFun.findOne({_id:req.params.id})
            sendMail(
                currentUser.email,
                "Your Booking Has Been Approved!",
                `
                Dear ${currentUser.name},
                <br>
                <br>
                We are excited to inform you that your booking has been successfully approved! We greatly appreciate 
                your choice to use our services and are delighted to accommodate your request.
                 <br>
                 <br>
                Best regards,
                <br>
                Emirates Tour Fun
                `
            )
         }
         res.status(200).json(find)
        
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}