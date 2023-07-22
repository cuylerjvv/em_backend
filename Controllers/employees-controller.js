const employeeModel = require('../Models/employeeModel')

const { v4: uuidv4 } = require('uuid')

const getEmployee = async (req, res, next) => {
  
  try {
    const location = req.location;
    console.log(location);
    let employees;

    if (!location) {
      throw new Error('Location parameter is undefined');
    }

    if (location === 'dixie') {
      console.log('GET req for dixie employees');

      // employee is a array with all the values that corresponded with the find() method's arguments, with employeeModel schema, in the Employee_D database.
      employees = await employeeModel.Employee_D.find({}, 'name surname nationality rid id');

      res.json({
        employee: employees.map(employee => employee.toObject({ getters: true })),
      });
    }

    if (location === 'gazelle') {
      console.log('GET req for gazelle employees');
      employees = await employeeModel.Employee_G.find({}, 'name surname nationality rid id');

      res.json({
        employee: employees.map(employee => employee.toObject({ getters: true })),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 


const createEmployee = async (req, res, next) => {
  console.log('POST req for employees');
  try {
    const location = req.location;
    console.log(location);
    let employee;

    if (!location) {
      throw new Error('Location parameter is undefined');
    }

    if (location === 'dixie') {
      console.log('POST req for dixie employees');
      employee = new employeeModel.Employee_D({
        id: uuidv4(),
        name: req.body.name,
        surname: req.body.surname,
        nationality: req.body.nationality,
        rid: req.body.rid
      });
    } else if (location === 'gazelle') {
      console.log('POST req for gazelle employees');
      employee = new employeeModel.Employee_G({
        id: uuidv4(),
        name: req.body.name,
        surname: req.body.surname,
        nationality: req.body.nationality,
        rid: req.body.rid
      });
    } else {
      throw new Error('Invalid location');
    }

    await employee.save();

    res.status(201).json({ employee: employee.toObject({ getters: true }) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEmployee = async (req, res, next) => {
  console.log('DELETE');
  try {

    const location = req.location;
    const { employeeId } = req.body;
    console.log(employeeId);

    let deletedEmployee;

    if (!location) {
      throw new Error('Location parameter is undefined');
    }

    if (location === 'dixie') {
      console.log('DELETE req for dixie employees');
      deletedEmployee = await employeeModel.Employee_D.findByIdAndDelete(employeeId);
    } 
      else if (location === 'gazelle') {
      console.log('DELETE req for gazelle employees');
      deletedEmployee = await employeeModel.Employee_G.findByIdAndDelete(employeeId);
    } 
      else {
      throw new Error('Invalid location');
    }

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee ID not found' });
    }

    res.status(200).json({ message: 'Employee deleted' });
  } 
    catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    getEmployee: getEmployee,
    createEmployee: createEmployee,
    deleteEmployee: deleteEmployee
};