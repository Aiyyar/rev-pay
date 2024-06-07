const Business = require('../models/Business');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerBusiness = async (req, res) => {
    const { username, password } = req.body;

    try {
        let business = await Business.findOne({ username });

        if (business) {
            return res.status(400).json({ msg: 'Business already exists' });
        }

        business = new Business({ username, password });
        await business.save();

        const payload = {
            business: {
                id: business.id
            }
        };

        jwt.sign(payload, 'yourSecretKey', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.loginBusiness = async (req, res) => {
    const { username, password } = req.body;

    try {
        let business = await Business.findOne({ username });

        if (!business) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, business.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            business: {
                id: business.id
            }
        };

        jwt.sign(payload, 'yourSecretKey', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
