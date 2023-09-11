const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewsSchema = mongoose.Schema({
    date: {
        type: Date,
        require:true
    },
    
    name: {
        type:String,
        require: true,
    },
   
    review: {
        type:String,
    },
    rating: {
        type:Number,
        require: true,
    },
  
    websiteName: {
        type:String,
        enum: ['tourfuns', 'welcometosafari'],
        require: true,
    },
    active: {
        type:Boolean,
        default: true,
    },

},
    { timestamps: true }
)

const Reviews = mongoose.model('review', reviewsSchema);

module.exports = Reviews;


