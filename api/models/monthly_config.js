const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monthlyConfigSchema = mongoose.Schema({
    month: {
        type: Date,
        require:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    totalDays: {
        type: Number,
        require: true,
        default:0
    },
    payed: {
        type: Boolean,
        default:false
    },
},
    { timestamps: true }
)

const Config = mongoose.model('monthlyConfig', monthlyConfigSchema);

module.exports = Config;


