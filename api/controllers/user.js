const User = require('../models/user');
var { encrypt, decrypt } = require('../../utils/helper');
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const moment =require("moment")

exports.registerNewUser = async (req, res) => {
    try {
        var data = req.body;
        data.password = encrypt(data.password)
        const user = new User(data)
        var doc = await user.save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


exports.login = async (req, res, next) => {
    try {
        const data = req.body;
        var result = await User.findOne({ email: data.email })
        if (!result) {
            return res.status(404).json({ message: "User Not Found" })
        }
        var decryptedPass = await decrypt(result.password);
        if (decryptedPass !== data.password) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        // if(result.is_logedIn){
        //   return res.status(401).json({ message: "This account is already logged in!" });
        // }
       // await User.findByIdAndUpdate({_id:result._id},{is_logedIn:true})

        var token = jwt.sign({ id: result._id }, config.secret, {
            expiresIn: config.expiresIn
        });
        res.status(200).json({
            user: result,
            accessToken: token
        })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

exports.logout = async (req, res, next) => {
  try {
        await User.findByIdAndUpdate({_id:req.userId},{is_logedIn:false})
      res.status(200).json(true)
  }
  catch (err) {
      res.status(400).json({ message: err.message })
  }

}


exports.findAll = async (req, res, next) => {
    try {
        var result = await User.find()
        for(var i=0;i<result.length;i++){
            result[i].password=await decrypt(result[i].password)
        }
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

exports.updateRecord = async (req, res) => {
    try {
        var data = req.body;
        data.password = encrypt(data.password)
        var doc = await User.findByIdAndUpdate({ _id: req.params.id }, data,{new:true})
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        var doc = await User.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.Report = async (req, res) => {
    try {
        var {startDate,endDate,user}=req.body
        startDate=moment(startDate).format("YYYY-MM-DD")
        endDate=moment(endDate).format("YYYY-MM-DD")
        let userQuery={};
        if(user){
          userQuery.$expr = { $eq: [ '$_id' , { $toObjectId: user } ] }
        }
        var doc = await User.aggregate(
            [
              {
                $match:{...userQuery}
              },
                {
                  $lookup: {
                    from: "items",
                    localField: "_id",
                    foreignField: "user",
                    as: "items",
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              {
                                $gte: ["$date", new Date(startDate)],
                              },
                              {
                                $lte: ["$date", new Date(endDate)],
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  $lookup: {
                    from: "monthlyconfigs",
                    localField: "_id",
                    foreignField: "user",
                    as: "config",
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              {
                                $gte: ["$month", new Date(startDate)],
                              },
                              {
                                $lte: ["$month", new Date(endDate)],
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
                {
                    $lookup: {
                      from: "otherexpenses",
                      localField: "_id",
                      foreignField: "user",
                      as: "otherExpenses",
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $and: [
                                {
                                  $gte: ["$date", new Date(startDate)],
                                },
                                {
                                  $lte: ["$date", new Date(endDate)],
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  }
                ,{
                $addFields:{
                    totalSpend:{
                      $sum:"$items.amount"
                    },
                    totalNumberOfDays:{
                        $sum:"$config.totalDays"
                      },
                      totalOtherExpense:{
                        $sum:"$otherExpenses.amount"
                      }
                  }
                }
              ]
        )
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


