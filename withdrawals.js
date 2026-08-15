const express = require('express');
const router = express.Router();
const withdrawalController = require('../controllers/withdrawalController');
const auth = require('../middleware/auth');

router.post('/telebirr', auth, withdrawalController.initiateWithdrawal);
router.get('/history', auth, withdrawalController.getWithdrawalHistory);

module.exports = router;