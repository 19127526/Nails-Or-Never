const db = require('../configs/mysql');

exports.getContact = (limit = 5, page = 1) => {
  return db('contact')
    .limit(limit)
    .offset((page - 1) * limit)
}

exports.getAllContact = () =>{
  return db('contact')
}

exports.transaction = () => {
  return db.transaction()
}

exports.createContact = (data, trx) => {
  return db('contact')
    .transacting(trx)
    .insert(data)
}

exports.countContact = () => {
  return db('contact').count('id as total')
}

exports.deleteContactById = (id) => {
  return db('contact').where('id', id).del()
}