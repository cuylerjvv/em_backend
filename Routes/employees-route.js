const express = require('express');

const employeesController = require('../Controllers/employees-controller');

const router = express.Router();
 
router.get('/', employeesController.getEmployee);
router.post('/', employeesController.createEmployee);
// router.patch('/', employeesController.updateEmployee);
router.delete('/', employeesController.deleteEmployee);

module.exports = router; 