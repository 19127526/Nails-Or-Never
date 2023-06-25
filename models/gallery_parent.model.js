const db = require('../configs/mysql');


exports.getGalleryParent = (limit = 5, page = 1) => {
  return db('gallery_parents')
    .limit(limit)
    .offset((page - 1) * limit)
}

exports.countGalleryParent = () => {
  return db('gallery_parents').count('id as total')
}

exports.updateGalleryParentById = (id, data) => {
  return db('gallery_parents').where('id', id).update(data)
}

exports.getGalleryParentById = (id) => {
  return db('gallery_parents').where('id', id)
}

exports.createGalleryParent = (data) => {
  return db('gallery_parents').insert(data)
}

exports.deleteGalleryParentById = (id) => {
  return db('gallery_parents').where('id', id).del()
}