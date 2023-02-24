
const OtherExpenses = require('../models/otherExpenses');

exports.addNewItem = async (req, res) => {
    try {
        var data = req.body;
        var doc = await new OtherExpenses(data).save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.getItems = async (req, res) => {
    try {
         const {startDate,endDate}=req.body;
         let query={}
         if(startDate&&endDate){
             query.$and=[
              {date:{$gte:new Date(startDate).toISOString()}},
              {date:{$lte:new Date(endDate).toISOString()}}
             ]
            }
        var doc = await OtherExpenses.find(query).populate("user").sort({date:-1})
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

    exports.updateItem = async (req, res) => {
        try {
            var doc =await OtherExpenses.findByIdAndUpdate({_id:req.params.id},req.body)
            res.status(200).json(doc)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
    exports.deleteItem = async (req, res) => {
        try {
            var doc =await OtherExpenses.findByIdAndDelete({_id:req.params.id})
            res.status(200).json(doc)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }