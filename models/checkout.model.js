const db = require('../configs/mysql');
exports.createCheckout = (data, trx) => {
    return db('checkout')
        .transacting(trx)
        .insert(data)
}

exports.getCheckoutById = (id) => {
    return db('checkout')
        .where('id', id)
        .first();
}

