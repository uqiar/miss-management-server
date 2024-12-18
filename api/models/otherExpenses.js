const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otherExpensesSchema = mongoose.Schema({
    amount: {
        type: Number,
        require: true,
    },
    note: {
        type: String,
    },
    details: {
        type: String
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],

    date: {
        type: Date,
        require: true,
    }

},
    { timestamps: true }
)

const Expenses = mongoose.model('otherExpense', otherExpensesSchema);

module.exports = Expenses;


