const SafariReport = require('../models/safariReport');
const moment =require("moment");

exports.addNewItem = async (req, res) => {
    try {
        var data = req.body;
        data.user=req.userId
        var doc = await new SafariReport(data).save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getItems = async (req, res) => {
    try {
         const {startDate,endDate}=req.body;
         let query={user:req.userId}
        
         if(startDate&&endDate){
             query.$and=[
              {date:{$gte:new Date(moment(startDate).format("YYYY-MM-DD"))}},
              {date:{$lte:new Date(moment(endDate).format("YYYY-MM-DD"))}}
             ]
            }
            console.log(query)
        var doc = await SafariReport.find(query).sort({date:1})
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateItem = async (req, res) => {
    try {
        var doc =await SafariReport.findByIdAndUpdate({_id:req.params.id},req.body)
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.deleteItem = async (req, res) => {
    try {
        var doc =await SafariReport.findByIdAndDelete({_id:req.params.id})
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}