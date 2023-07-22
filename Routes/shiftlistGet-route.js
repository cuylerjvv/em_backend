const express = require('express');

const shiftlistController = require('../Controllers/shiftlist-controller');
 
const router = express.Router();

router.get('/', shiftlistController.getShiftlist);
router.delete('/', shiftlistController.deleteShiftlist);

module.exports = router; 