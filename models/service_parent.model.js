const db = require('../configs/mysql');

exports.getServicesParent = (limit = 5, page = 1) => {
    return db('services_parents')
        .limit(limit)
        .offset((page - 1) * limit)
}


exports.getServicesParentWithOutPagination = () => {
    return db('services_parents')
}

exports.countServicesParent = () => {
    return db('services_parents').count('id as total').first()
}

exports.updateServiceParentById = (id, data,trx) => {
    return db('services_parents')
        .transacting(trx)
        .where('id', id).update(data)
}

exports.transaction = () => {
    return db.transaction()
}

exports.getServiceParentById = (id) => {
    return db('services_parents').where('id', id)
}

exports.getServiceParentByName = (name) => {
    return db('services_parents').where('name', name)
}

exports.createServiceParent = (data,trx) => {
    return db('services_parents')
        .transacting(trx)
        .insert(data)
}

exports.deleteServiceParentById = (id) => {
    return db('services_parents').where('id', id).del()
}