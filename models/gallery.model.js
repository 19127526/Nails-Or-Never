const db = require('../configs/mysql');

exports.getGallery = () => {
  return db('gallery')
}

exports.updateGalleryById = (id, data) => {
  return db('gallery').where('id', id).update(data)
}

exports.getGalleryById = (id) => {
  return db('gallery').where('id', id)
}

exports.getGalleryByGalleryParentId = (id) => {
  return db('gallery')
    .select('id', 'image', 'description', 'gallery_parents')
    .where('gallery_parents', id)
}

exports.createGallery = (data) => {
  return db('gallery').insert(data)
}

exports.deleteGalleryById = (id) => {
  return db('gallery').where('id', id).del()
}