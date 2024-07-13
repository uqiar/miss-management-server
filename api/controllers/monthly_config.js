const moment = require('moment');
const MonthlyConfig = require('../models/monthly_config');

exports.getConfigByMonth = async (req, res) => {
    try {
         const {startDate,endDate}=req.body;
         let query={}
             query.$and=[
              {month:{$gte:new Date(startDate).toISOString()}},
              {month:{$lte:new Date(endDate).toISOString()}}
             ]
            
        var doc = await MonthlyConfig.find(query)
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.configureNewUser = async (req, res) => {
    try {
         const {date,user,totalDays}=req.body;
             let doc= await new MonthlyConfig({
                  month:new Date(moment(date).format("YYYY-MM-DD")),
                  user,
                  totalDays
              }).save()
          
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteConfigUser = async (req, res) => {
    try {
          const doc=await MonthlyConfig.findByIdAndDelete({_id:req.params.id})
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updatedUserMonthsDays = async (req, res) => {
    try {
          const doc=await MonthlyConfig.findOneAndUpdate({_id:req.params.id},req.body)
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


exports.markedPaydUnpayed = async (req, res) => {
    try {
        const {date,user,payed,id,paymentHistory}=req.body;
         let doc;
        if(id){
          doc=await MonthlyConfig.findOneAndUpdate({_id:id},{payed,paymentHistory})
        }else{
            doc= await new MonthlyConfig({
                month:new Date(date).toISOString(),
                user,
                payed,
                paymentHistory
            }).save()
        }
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}