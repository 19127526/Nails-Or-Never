const db = require('../configs/mysql');
exports.createDayOff = (data) => {
    return db('day_off')
        .insert(data)
}
