const Account = require('../models/account');

exports.createAccount = async (req, res) => {
    // res.status(200).send('hiii');
    const { bankAccountNumber, sortCode } = req.body;
    if (!req.business) {
        res.status(404).send('Business id is not Found'); 
           }
    else{    
    const businessId = req.business.id;}
    try {
        const account = new Account({
            businessId,
            accountId: new mongoose.Types.ObjectId().toString(),
            bankAccountNumber,
            sortCode
        });

     this.account= await account.save();
    
        res.json(account);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateAccount = async (req, res) => {
    const { accountId } = req.params;
    const updates = req.body;

    try {
        let account = await Account.findOne({ accountId });

        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        account = await Account.findByIdAndUpdate(accountId, updates, { new: true });
        res.json(account);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAccountBalance = async (req, res) => {
    const { accountId } = req.params;

    try {
        const account = await Account.findOne({ accountId });

        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        res.json({ balance: account.balance });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
