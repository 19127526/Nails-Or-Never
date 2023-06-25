const db = require('../configs/mysql');

exports.getEmployees = (limit = 5, page = 1) => {
  return db('employees')
    .limit(limit)
    .offset((page - 1) * limit)
}

exports.countEmployees = () => {
  return db('employees').count('id as total')
}

exports.updateEmployeesById = (id, data) => {
  return db('employees').where('id', id).update(data)
}

exports.getEmployeesById = (id) => {
  return db('employees').where('id', id)
}

exports.createEmployees = (data) => {
  return db('employees').insert(data)
}

exports.deleteEmployeesById = (id) => {
  return db('employees').where('id', id).del()
}