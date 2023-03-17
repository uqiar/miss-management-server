const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GivesMonySchema = new Schema({
    amount: {
        type: Number
    },
    notes: {
        type: String
    },
    date: {
        type: Date
    }
}, {
    timestamps: true
});

const CollectedMonySchema = new Schema({
    amount: {
        type: Number
    },
    notes: {
        type: String
    },
    date: {
        type: Date
    }
}, {
    timestamps: true
});

const myMonySchema = mongoose.Schema({
    name: {
        type: String,
        require: 1,
      //  unique: 1,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: 1,
    },
    givesMony: [GivesMonySchema],
    collectedMony:[CollectedMonySchema],
    subTotal: {
        type: Number,
        default: 0
    },
    deleted:{
       type:Boolean,
       default:false
    }
}, {
    timestamps: true
})

const MyBook = mongoose.model('mybook', myMonySchema);

module.exports = MyBook;