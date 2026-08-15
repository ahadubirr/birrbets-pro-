const express = require('express');
const router = express.Router();
const betController = require('../controllers/betController');
const auth = require('../middleware/auth');

router.post('/place', auth, betController.placeBet);
router.get('/my-bets', auth, betController.getMyBets);
router.post('/cashout/:betId', auth, betController.cashOut);

module.exports = router;