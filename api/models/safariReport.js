const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const safariSchema = mongoose.Schema({
    date: {
        type: Date,
        require:true
    },
    petrol: {
        type: Number,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    received_petrol: {
        type: Number,
    },
    bike: {
        type: Number,
    },
    grocery: {
        type: Number,
    },
    reviews: {
        type: Number,
    },
    salik: {
        type: Number,
    },
    other: {
        type: Number,
    },

},
    { timestamps: true }
)

const Report = mongoose.model('safariReport', safariSchema);

module.exports = Report;


