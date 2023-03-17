const MyBook = require('../models/myBook');

exports.addNewBook = async (req, res) => {
    try {
        var data = req.body;
        data.user = req.userId;
        let findDuplicateName = await MyBook.findOne({
            user: req.userId,
            name: data.name,
            deleted: false
        })
        if (findDuplicateName) {
            return res.status(400).json({
                message: "Name already exist!"
            })
        }
        var doc = await new MyBook(data).save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getAllBookes = async (req, res) => {
    try {
        var doc = await MyBook.find({
            user: req.userId,
            deleted: false
        })
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
exports.deleteUserBook = async (req, res) => {
    try {
        var doc = await MyBook.findByIdAndUpdate({
            _id: req.params.id
        }, {
            deleted: true
        })
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.addAmunt = async (req, res) => {
    try {
        var doc = await MyBook.findByIdAndUpdate({
            _id: req.params.id
        },{ $push: { "givesMony": req.body },$inc: { subTotal: req.body.amount } })
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
exports.ReceiveAmunt = async (req, res) => {
    try {
        var doc = await MyBook.findByIdAndUpdate({
            _id: req.params.id
        },{ $push: { "collectedMony": req.body },$inc: { subTotal: -req.body.amount } })
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.deleteAddAmountList = async (req, res) => {
    try {
        const {id,amount}=req.body;
        var doc = await MyBook.findByIdAndUpdate({
            _id:id
        },{ $pull: { "givesMony": {_id:req.params.id} },$inc: { subTotal: -amount } })
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.deleteColectAmountList = async (req, res) => {
    try {
        const {id,amount}=req.body;
        var doc = await MyBook.findByIdAndUpdate({
            _id:id
        },{ $pull: { "collectedMony": {_id:req.params.id} },$inc: { subTotal: amount } })
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}