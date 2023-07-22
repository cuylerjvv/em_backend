const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const databaseConnections = require('./databaseConnections');
const employeesRoute = require('./Routes/employees-route');
const shiftlistGetRoute = require('./Routes/shiftlistGet-route');
const shiftlistCreateRoute = require('./Routes/shiftlistCreate-route')
const availableWagesRoute = require('./Routes/availableWages-route')
const wagesRoute = require('./Routes/wages-route')

const app = express();

app.use(bodyParser.json());

// If you use cors, In my instance I did not need to set headers
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     next();
// });

app.use('/:location', (req, res, next) => {
    const location = req.params.location;
    req.location = location;
    next();
}, availableWagesRoute);

app.use('/:location/wages/:firstday', (req, res, next) => {
    const location = req.params.location;
    const firstday = req.params.firstday;
    req.location = location;
    req.firstday = firstday;
    next();
}, wagesRoute);

app.use('/:location/shiftlist', (req, res, next) => {
    const location = req.params.location;
    req.location = location;
    next();
}, shiftlistGetRoute);

app.use('/:location/employees', (req, res, next) => {
    const location = req.params.location;
    console.log(location);
    req.location = location;
    next();
  }, employeesRoute);

  app.use('/:location/shiftlist/create', (req, res, next) => {
    const location = req.params.location;
    req.location = location;
    next();
}, shiftlistCreateRoute);

Promise.all([databaseConnections.dixie, databaseConnections.gazelle])
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
        console.log('Server is running on http://localhost:5000');
        });
    })
    .catch(err => {
        console.log(err);
    });