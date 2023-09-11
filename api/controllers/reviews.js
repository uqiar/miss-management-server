const Reviews = require('../models/reviews');
const moment =require("moment");

exports.AddRecord = async (req, res) => {
    try {
        var data = req.body;
        var doc = await new Reviews(data).save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.GetRecords = async (req, res) => {
    try {
        var doc = await Reviews.find({websiteName:req.params.name,active:true})
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}