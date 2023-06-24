const db = require('../configs/mysql');

exports.getServices = () => {
    return db('services')
}

exports.updateServiceById = (id, data) => {
    return db('services').where('id', id).update(data)
}

exports.getServiceById = (id) => {
    return db('services').where('id', id)
}

exports.getServiceByServiceParentId = (id) => {
    return db('services')
        .select('id', 'name', 'image', 'description','price','time')
        .where('services_parents', id)
}

exports.createService = (data) => {
    return db('services').insert(data)
}

exports.deleteServiceById = (id) => {
    return db('services').where('id', id).del()
}