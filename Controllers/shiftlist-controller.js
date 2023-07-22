const weekModel = require('../Models/weekModel');

// const { v4: uuidv4 } = require('uuid')

const getShiftlist = async (req, res, next) => {
    const location = req.location;
    let shiftlists;

    if (!location) {
        throw new Error('Location parameter is undefined');
    }

    if (location === 'dixie') {
        console.log('GET req for dixie shiftlist.');

        shiftlists = await weekModel.Week_D.find({});

        if (!shiftlists) {
            throw new Error('Error');
        }

        res.json({
            shiftlist: shiftlists.map(shiftlist => shiftlist.toObject({ getters: true })),
        });
    }

    if (location === 'gazelle') {
        console.log('GET req for gazelle shiftlist.');

        shiftlists = await weekModel.Week_G.find({});

        if (!shiftlists) {
            throw new Error('Error');
        }

        res.json({
            shiftlist: shiftlists.map(shiftlist => shiftlist.toObject({ getters: true })),
        });
    }
}

const createShiftlist = async (req, res, next) => {

    try {
        const location = req.location
        console.log(location)
        let shiftlist;

        if (!location) {
            throw new Error('Location parameter is undefined');
        }

        if (location === 'dixie') {
            console.log("POST req for dixie.")
            const days = req.body.days.map(day => ({
                day: day.day,
                shifts: {
                    dayshift: {
                        cashier: day.shifts.dayShift.cashier,
                        attendantOne: day.shifts.dayShift.attendantOne,
                        attendantTwo: day.shifts.dayShift.attendantTwo,
                        attendantThree: day.shifts.dayShift.attendantThree
                    },
                    nightshift: {
                        cashier: day.shifts.nightShift.cashier,
                        attendantOne: day.shifts.nightShift.attendantOne,
                        attendantTwo: day.shifts.nightShift.attendantTwo,
                        attendantThree: day.shifts.nightShift.attendantThree
                    }
                }
            }));

            shiftlist = new weekModel.Week_D({
                firstDay: req.body.startDate,
                days: days
            });
        }

        else if (location === 'gazelle') {
            console.log("POST req for gazelle.")
            const days = req.body.days.map(day => ({
                day: day.day,
                shifts: {
                    dayshift: {
                        cashier: day.shifts.dayShift.cashier,
                        attendantOne: day.shifts.dayShift.attendantOne,
                        attendantTwo: day.shifts.dayShift.attendantTwo,
                        attendantThree: day.shifts.dayShift.attendantThree
                    }
                }
            }));

            shiftlist = new weekModel.Week_G({
                firstDay: req.body.startDate,
                days: days
            });
        }

        else {
            throw new Error('Invalid location');
        }

        await shiftlist.save();

        res.status(201).json({ shiftlist: shiftlist.toObject({ getters: true }) });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteShiftlist = async (req, res, next) => {
    console.log('DELETE shiftlist');
    try {
        const location = req.location;
        const { shiftlistId } = req.body;
        console.log(shiftlistId);

        let deletedShiftlist;

        if (!location) {
            throw new Error('Location parameter is undefined');
        }

        if (location === 'dixie') {
            console.log('DELETE req for dixie shiftlist');
            deletedShiftlist = await weekModel.Week_D.findByIdAndDelete(shiftlistId);
        }

        else if (location === 'gazelle'){
            console.log('DELETE req for dixie shiftlist');
            deletedShiftlist = await weekModel.Week_G.findByIdAndDelete(shiftlistId);
        }

        else {
            throw new Error('Invalid location');
        }

        if (!deletedShiftlist) {
            return res.status(404).json({ message: 'Employee ID not found' });
        }

        res.status(200).json({ message: 'Shiftlist deleted' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createShiftlist,
    getShiftlist,
    deleteShiftlist
}