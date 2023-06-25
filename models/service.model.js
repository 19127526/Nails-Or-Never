const db = require('../configs/mysql');

exports.getServices = () => {
    return db('services')
}

exports.getServicesPaginationByParentId = (limit = 5, page = 1, id) => {
    return db('services').where('services_parents', id)
      .limit(limit)
      .offset((page - 1) * limit)
}

exports.countServicesByParentId = (id) => {
    return db('services').where('services_parents', id).count('id as total').first()
}


exports.updateServiceById = (id, data) => {
    return db('services').where('id', id).update(data)
}

exports.getServiceById = (id) => {
    return db('services').where('id', id)
}

exports.getServiceByServiceParentId = (id) => {
    return db('services')
        .select('id', 'name', 'description','price','time')
        .where('services_parents', id)
}



exports.createService = (data,trx) => {
    return db('services')
        .transacting(trx)
        .insert(data)
}

exports.deleteServiceById = (id) => {
    return db('services').where('id', id).del()
}