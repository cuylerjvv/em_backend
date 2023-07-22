const express = require('express');

const shiftlistController = require('../Controllers/shiftlist-controller');
const employeesController = require('../Controllers/employees-controller');

const router = express.Router();

router.get('/', employeesController.getEmployee);
router.post('/', shiftlistController.createShiftlist);

module.exports = router;  