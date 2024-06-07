const Transaction = require('../models/transaction');
const Account = require('../models/account');

exports.createTransaction = async (req, res) => {
    const { accountId, type, amount } = req.body;
    // const businessId = req.business.id;
    if (!req.business) {
        res.status(404).send('Business id is not Found');
        }
        else{
            const businessId = req.business.id;
        }

    try {
        let account = await Account.findOne({ accountId, businessId });

        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        if (account.activationStatus === 'INACTIVE') {
            return res.status(400).json({ msg: 'Account is inactive' });
        }

        if (type === 'WITHDRAWAL') {
            const dailyWithdrawalTotal = await Transaction.aggregate([
                { $match: { accountId: account._id, type: 'WITHDRAWAL', date: { $gte: new Date().setHours(0, 0, 0, 0) } } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]);

            const dailyTotal = dailyWithdrawalTotal[0] ? dailyWithdrawalTotal[0].total : 0;

            if (dailyTotal + amount > account.dailyWithdrawalLimit) {
                return res.status(400).json({ msg: 'Daily withdrawal limit exceeded' });
            }

            if (!account.allowDebit) {
                return res.status(400).json({ msg: 'Debit transactions are not allowed' });
            }

            if (account.balance < amount) {
                return res.status(400).json({ msg: 'Insufficient balance' });
            }

            account.balance -= amount;

        } else if (type === 'DEPOSIT') {
            if (!account.allowCredit) {
                return res.status(400).json({ msg: 'Credit transactions are not allowed' });
            }

            account.balance += amount;
        }

        await account.save();

        const transaction = new Transaction({ accountId: account._id, type, amount });
        await transaction.save();

        res.json(transaction);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



exports.getTransaction = async (req, res) => {
    const { accountId, type, startDate, endDate } = req.query;
    if (!req.business) {
        res.status(404).send('Business id is not Found');
        }
        else{
            const businessId = req.business.id;
        }
    try {
        const account = await Account.findOne({ _id: accountId, businessId });

        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        // Build the query object
        let query = { accountId: account._id };

        if (type) {
            query.type = type;
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) {
                query.date.$gte = new Date(startDate);
            }
            if (endDate) {
                query.date.$lte = new Date(endDate);
            }
        }

        // Find transactions matching the query
        const transactions = await Transaction.find(query).sort({ date: -1 });

        res.json(transactions);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
