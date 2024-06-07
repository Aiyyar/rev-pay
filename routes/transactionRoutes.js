const express = require('express');
const { createTransaction } = require('../controllers/transactionController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createTransaction);

module.exports = router;
