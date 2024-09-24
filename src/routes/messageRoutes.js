const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.put('/sms/update-status/:id', messageController.updateStatus);
router.get('/sms/report/:status', messageController.getMessagesByStatus);

module.exports = router;
