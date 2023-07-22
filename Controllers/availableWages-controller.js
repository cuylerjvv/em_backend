const weekModel = require('../Models/weekModel');

const getAvailableWages = async (req, res, next) => {
    const location = req.location;

    if (!location) {
        throw new Error('Location parameter is undefined');
    }

    if (location === 'dixie') {
        console.log('GET req for dixie firstdays.');

        firstdays = await weekModel.Week_D.find({}, 'firstDay');

        if (!firstdays) {
            throw new Error('Error');
        }

        res.json({
            firstdays: firstdays.map(firstday => firstday.toObject({ getters: true })),
        });
    }

    if (location === 'gazelle') {
        console.log('GET req for gazelle firstdays.');

        firstdays = await weekModel.Week_G.find({}, 'firstDay');

        if (!firstdays) {
            throw new Error('Error');
        }

        res.json({
            firstdays: firstdays.map(firstday => firstday.toObject({ getters: true })),
        });
    }
}

module.exports = {
    getAvailableWages

}