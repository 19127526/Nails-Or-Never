const db = require('../configs/mysql');

exports.getEmployees = () => {
    return db('employees')
}
exports.transaction = () => {
    return db.transaction()
}

exports.countEmployees = () => {
    return db('employees').count('id as total')
}

exports.updateEmployeesById = (id, data, trx) => {
    return db('employees')
        .transacting(trx)
        .where('id', id)
        .update(data)
}

exports.getEmployeesById = (id) => {
    return db('employees').where('id', id)
}

exports.createEmployees = (data, trx) => {
    return db('employees')
        .transacting(trx)
        .insert(data)
}

exports.deleteEmployeesById = (id) => {
    return db('employees').where('id', id).del()
}