const Items = require('../models/items');
const moment =require("moment");

exports.addNewItem = async (req, res) => {
    try {
        var data = req.body;
        var doc = await new Items(data).save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getItems = async (req, res) => {
    try {
         const {startDate,endDate,user}=req.body;
         let query={}
         if(user){
            query.user=user
         }
         if(startDate&&endDate){
             query.$and=[
              {date:{$gte:new Date(moment(startDate).format("YYYY-MM-DD"))}},
              {date:{$lte:new Date(moment(endDate).format("YYYY-MM-DD"))}}
             ]
            }
            console.log(new Date(moment(startDate).format("YYYY-MM-DD")))
        var doc = await Items.find(query).populate("user").sort({date:-1})
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateItem = async (req, res) => {
    try {
        var doc =await Items.findByIdAndUpdate({_id:req.params.id},req.body)
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.deleteItem = async (req, res) => {
    try {
        var doc =await Items.findByIdAndDelete({_id:req.params.id})
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}