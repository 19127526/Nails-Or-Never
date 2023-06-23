const db = require('../configs/mysql');

exports.getServices = (limit=5, page=1) => {
    return db('services')
        .join('services_parents', 'services_parents.id', '=', 'services.services_parents')
}

exports.updateServiceById = (id, data) => {
    return db('services').where('id', id).update(data)
}

exports.getServiceById = (id) => {
    return db('services').where('id', id)
}

exports.createService = (data) => {
    return db('services').insert(data)
}

exports.deleteServiceById = (id) => {
    return db('services').where('id', id).del()
}