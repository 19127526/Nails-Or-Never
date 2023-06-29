const db = require('../configs/mysql');

exports.transaction = () => {
  return db.transaction()
}

exports.createGiftCardCheckout = (data, trx) => {
    return db('gift_cards_checkout')
        .transacting(trx)
        .insert(data)
}

exports.getGiftCardByCheckoutId = (checkoutId) => {
    return db('gift_cards_checkout')
        .where('checkout_id', checkoutId)
        .select('gift_card_id', 'quantity', 'price')
}