const express = require('express')

const availableWagesController = require('../Controllers/availableWages-controller')

const router = express.Router();

router.get('/', availableWagesController.getAvailableWages);

module.exports = router;  