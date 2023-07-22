const express = require('express')

const wagesController = require('../Controllers/wages-controller')

const router = express.Router();

router.get('/', wagesController.getWages);

module.exports = router; 