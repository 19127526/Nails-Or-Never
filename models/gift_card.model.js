const db = require('../configs/mysql');

exports.transaction = () => {
  return db.transaction()
}

exports.getGiftCard = (limit = 5, page = 1) => {
  return db('gift_cards')
    .limit(limit)
    .offset((page - 1) * limit)
}

exports.getAllGiftCard = () => {
  return db('gift_cards')
}

exports.countGiftCard = () => {
  return db('gift_cards').count('id as total')
}

exports.updateGiftCardById = (id, data,trx) => {
  return db('gift_cards')
    .transacting(trx)
    .where('id', id).update(data)
}

exports.getGiftCardById = (id) => {
  return db('gift_cards').where('id', id)
}

exports.getGiftCardByTheme = (theme) => {
  return db('gift_cards').where('theme', theme)
}

exports.createGiftCard = (data, trx) => {
  return db('gift_cards')
    .transacting(trx)
    .insert(data)
}

exports.deleteGiftCardById = (id) => {
  return db('gift_cards').where('id', id).del()
}

