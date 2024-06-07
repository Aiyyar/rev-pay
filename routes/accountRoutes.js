const express = require('express');
const { createAccount, updateAccount, getAccountBalance } = require('../controllers/accountController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/',auth, createAccount);
router.put('/:accountId', auth, updateAccount);
router.get('/:accountId/balance', auth, getAccountBalance);

module.exports = router;
