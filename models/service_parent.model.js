const db = require('../configs/mysql');

exports.getServicesParent = (limit = 5, page = 1) => {
    return db('services_parents')
        .limit(limit)
        .offset((page - 1) * limit)
}

exports.countServicesParent = () => {
    return db('services_parents').count('id as total')
}

exports.updateServiceParentById = (id, data) => {
    return db('services_parents').where('id', id).update(data)
}

exports.getServiceParentById = (id) => {
    return db('services_parents').where('id', id)
}

exports.createServiceParent = (data) => {
    return db('services_parents').insert(data)
}

exports.deleteServiceParentById = (id) => {
    return db('services_parents').where('id', id).del()
}