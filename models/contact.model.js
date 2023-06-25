const db = require('../configs/mysql');

exports.getContact = (limit = 5, page = 1) => {
  return db('contact')
    .limit(limit)
    .offset((page - 1) * limit)
}

exports.countContact = () => {
  return db('contact').count('id as total')
}

exports.deleteContactById = (id) => {
  return db('contact').where('id', id).del()
}