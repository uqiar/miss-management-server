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
         console.log(date)
             let doc= await new MonthlyConfig({
                  month:new Date(date).toISOString(),
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