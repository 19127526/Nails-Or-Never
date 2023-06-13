const db = require('../configs/mysql');

exports.getServices = () => {
    return db('services')
}