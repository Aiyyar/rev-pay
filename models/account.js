const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    businessId: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Business',
        required: true 
      },
    accountId: {
       type: String,
        required: true, 
        unique: true
       },
    bankAccountNumber: { 
      type: String,
       required: true,
        maxlength: 10 
      },
    sortCode: { 
      type: String, 
      required: true,
       maxlength: 8 
      },
    activationStatus: { 
      type: String,
       enum: ['ACTIVE', 'INACTIVE'], 
       default: 'ACTIVE' 
      },
    allowCredit: { 
      type: Boolean, 
      default: true 
    },
    allowDebit: { 
      type: Boolean,
       default: true
       },
    dailyWithdrawalLimit: {
       type: Number,
        default: 0
       },
    balance: {
       type: Number, 
       default: 0 
      }
});

module.exports = mongoose.model('Account', AccountSchema);
