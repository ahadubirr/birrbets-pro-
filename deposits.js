const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');
const auth = require('../middleware/auth');

router.post('/telebirr', auth, depositController.initiateTelebirrDeposit);
router.post('/confirm', auth, depositController.confirmDeposit);
router.get('/history', auth, depositController.getDepositHistory);

module.exports = router;