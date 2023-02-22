const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = mongoose.Schema({
    item: {
        type: String,
        require:true
    },
    amount: {
        type: Number,
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    userName: {
        type:String
    },
   
    date:{
        type:Date,
        require: true,
    }

},
    { timestamps: true }
)

const Items = mongoose.model('item', itemSchema);

module.exports = Items;


