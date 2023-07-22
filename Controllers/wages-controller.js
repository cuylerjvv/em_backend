const weekModel = require('../Models/weekModel');
const employeeModel = require('../Models/employeeModel')

const getWages = async (req, res, next) => {
  const location = req.location;
  const firstday = req.firstday;

  if (!location) {
    throw new Error('Location parameter is 0');
  }

  if (location === 'dixie') {
    console.log('GET req for dixie wage for firstday: ' + firstday);

    try {
      const wage = await weekModel.Week_D.findOne({ firstDay: firstday });
      const employees = await employeeModel.Employee_D.find({}, 'name surname _id');
      let employeesCounter = employees.map((employee) => {
        return { name: employee.name, surname: employee.surname, id: employee._id, cashierCounter: 0, attendantCounter: 0 }
      })

      console.log(employeesCounter)

      const days = wage.days
      // console.log(days)
      const cashiers = []
      const attendants = []

      days.forEach((day) => {
        if (day.shifts.dayshift.cashier !== 0) {
          cashiers.push(day.shifts.dayshift.cashier)
        }
        if (day.shifts.nightshift.cashier !== 0) {
          cashiers.push(day.shifts.nightshift.cashier)
        }

      })

      days.forEach((day) => {
        if (day.shifts.dayshift.attendantOne !== 0) {
          attendants.push(day.shifts.dayshift.attendantOne);
        }

        if (day.shifts.dayshift.attendantTwo !== 0) {
          attendants.push(day.shifts.dayshift.attendantTwo);
        }

        if (day.shifts.dayshift.attendantThree !== 0) {
          attendants.push(day.shifts.dayshift.attendantThree);
        }

        if (day.shifts.nightshift.attendantOne !== 0) {
          attendants.push(day.shifts.nightshift.attendantOne);
        }

        if (day.shifts.nightshift.attendantTwo !== 0) {
          attendants.push(day.shifts.nightshift.attendantTwo);
        }

        if (day.shifts.nightshift.attendantThree !== 0) {
          attendants.push(day.shifts.nightshift.attendantThree);
        }
      })

      cashiers.forEach((cashier) => {
        console.log(cashier.id)
        for (let i = 0; i < employeesCounter.length; i++) {
          const id = employeesCounter[i].id.toString()
          console.log(id)
          if (cashier.id === id) {
            employeesCounter[i].cashierCounter++;
          }
          console.log(employeesCounter[i].cashierCounter)
        }

      })

      attendants.forEach((attendant) => {
        console.log(attendant.id)
        for (let i = 0; i < employeesCounter.length; i++) {
          const id = employeesCounter[i].id.toString()
          console.log(id)
          if (attendant.id === id) {
            employeesCounter[i].attendantCounter++;
          }
          console.log(employeesCounter[i].attendantCounter)
        }
      })

      let employeesWages = employeesCounter.map((employee) => {
        return { name: employee.name, surname: employee.surname, cashierWage: employee.cashierCounter * 12 * 37.99, attendantWage: employee.attendantCounter * 12 * 36.1 }
      })

      if (!wage) {
        throw new Error('Wage not found');
      }

      res.json({
        wage: wage.toObject({ getters: true }),
        employeesCounter: employeesCounter,
        employeesWages: employeesWages
      });

    } catch (error) {
      throw new Error('Error retrieving wage');
    }
  }

  if (location === 'gazelle') {
    console.log('GET req for gazelle wage for firstday: ' + firstday);

    try {
      const wage = await weekModel.Week_G.findOne({ firstDay: firstday });
      const employees = await employeeModel.Employee_G.find({}, 'name surname _id');
      let employeesCounter = employees.map((employee) => {
        return { name: employee.name, surname: employee.surname, id: employee._id, cashierCounter: 0, attendantCounter: 0 }
      })

      console.log(employeesCounter)

      const days = wage.days
      // console.log(days)
      const cashiers = []
      const attendants = []

      days.forEach((day) => {
        if (day.shifts.dayshift.cashier !== 0) {
          cashiers.push(day.shifts.dayshift.cashier)
        }
      })

      days.forEach((day) => {
        if (day.shifts.dayshift.attendantOne !== 0) {
          attendants.push(day.shifts.dayshift.attendantOne);
        }

        if (day.shifts.dayshift.attendantTwo !== 0) {
          attendants.push(day.shifts.dayshift.attendantTwo);
        }

        if (day.shifts.dayshift.attendantThree !== 0) {
          attendants.push(day.shifts.dayshift.attendantThree);
        }
      })

      cashiers.forEach((cashier) => {
        console.log(cashier.id)
        for (let i = 0; i < employeesCounter.length; i++) {
          const id = employeesCounter[i].id.toString()
          console.log(id)
          if (cashier.id === id) {
            employeesCounter[i].cashierCounter++;
          }
          console.log(employeesCounter[i].cashierCounter)
        }

      })

      attendants.forEach((attendant) => {
        console.log(attendant.id)
        for (let i = 0; i < employeesCounter.length; i++) {
          const id = employeesCounter[i].id.toString()
          console.log(id)
          if (attendant.id === id) {
            employeesCounter[i].attendantCounter++;
          }
          console.log(employeesCounter[i].attendantCounter)
        }
      })

      let employeesWages = employeesCounter.map((employee) => {
        return { name: employee.name, surname: employee.surname, cashierWage: employee.cashierCounter * 12 * 37.99, attendantWage: employee.attendantCounter * 12 * 36.1 }
      })

      if (!wage) {
        throw new Error('Wage not found');
      }

      res.json({
        wage: wage.toObject({ getters: true }),
        employeesCounter: employeesCounter,
        employeesWages: employeesWages
      });

    } catch (error) {
      throw new Error('Error retrieving wage');
    }
  }
}

module.exports = {
  getWages

}