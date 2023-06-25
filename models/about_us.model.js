const db = require('../configs/mysql');

exports.getAboutUs = () => {
  return db('about_us')
}

exports.updateAboutUsById = (id, data) => {
  return db('about_us').where('id', id).update(data)
}