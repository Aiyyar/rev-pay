const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    accountId: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Account',
        required: true },
    type: {
       type: String,
        enum: ['DEPOSIT', 'WITHDRAWAL'],
         required: true 
        },
    amount: { 
      type: Number, 
      required: true 
    },
    date: { 
      type: Date,
       default: Date.now
       }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
