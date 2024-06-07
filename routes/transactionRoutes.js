const express = require('express');
const { getTransaction,createTransaction } = require('../controllers/transactionController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/create', createTransaction);
router.get('/',getTransaction);

module.exports = router;
