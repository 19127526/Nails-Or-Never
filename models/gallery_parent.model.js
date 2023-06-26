const db = require('../configs/mysql');


exports.getGalleryParent = (limit = 5, page = 1) => {
  return db('gallery_parents')
    .limit(limit)
    .offset((page - 1) * limit)
}

exports.getAllGalleryParent = () => {
  return db('gallery_parents')
}

exports.transaction = () => {
  return db.transaction()
}

exports.countGalleryParent = () => {
  return db('gallery_parents').count('id as total')
}

exports.updateGalleryParentById = (id, data,trx) => {
  return db('gallery_parents')
    .transacting(trx)
    .where('id', id).update(data)
}

exports.getGalleryParentById = (id) => {
  return db('gallery_parents').where('id', id)
}

exports.createGalleryParent = (data, trx) => {
  return db('gallery_parents')
    .transacting(trx)
    .insert(data)
}

exports.deleteGalleryParentById = (id) => {
  return db('gallery_parents').where('id', id).del()
}