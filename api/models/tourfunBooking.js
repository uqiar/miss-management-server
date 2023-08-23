const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = mongoose.Schema({
    date: {
        type: Date,
        require:true
    },
    
    name: {
        type:String,
        require: true,
    },
   
    email: {
        type:String,
        require: true,
    },
    location: {
        type:String,
        require: true,
    },
    numberOfPeople: {
        type:Number,
        require: true,
    },
    phone: {
        type:String,
        require: true,
    },
    status: {
        type:String,
        enum: ['pending', 'approved', 'success','cancel'],
    default: 'pending' // Default value if none is specified
    },
    packagePrice: {
        type:Number,
        default:0
    },
    totalAmount: {
        type:Number,
        default:0
    },
    packageName: {
        type:String,
    },

},
    { timestamps: true }
)

const Booking = mongoose.model('tourfunbooking', bookingSchema);

module.exports = Booking;


