const db = require('../configs/mysql');

exports.getGallery = () => {
  return db('gallery')
}

exports.transaction = () => {
  return db.transaction()
}

exports.updateGalleryById = (id, data, trx) => {
  return db('gallery')
      .transacting(trx)
      .where('id', id)
      .update(data)
}

exports.getGalleryById = (id) => {
  return db('gallery').where('id', id)
}

exports.getGalleryByGalleryParentId = (id) => {
  return db('gallery')
      .select('id', 'image', 'gallery_parents')
      .where('gallery_parents', id)
}

exports.createGallery = (data, trx) => {
  return db('gallery')
      .transacting(trx)
      .insert(data)
}

exports.deleteGalleryById = (id) => {
  return db('gallery').where('id', id).del()
}

exports.deleteGalleryByParentId = (parentId) => {
  return db('gallery').where('gallery_parents', parentId).del()
}

exports.countGalleryByParentId = (id) => {
  return db('gallery').where('gallery_parents', id).count('id as total').first()
}

exports.getGalleryPaginationByParentId = (limit = 5, page = 1, id) => {
  return db('gallery').where('gallery_parents', id)
      .limit(limit)
      .offset((page - 1) * limit)
}