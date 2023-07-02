const db = require('../configs/mysql');
exports.createBooking = (data,trx) => {
    return db('booking')
        .transacting(trx)
        .insert(data)
}

exports.insertBookingService = (data, trx) => {
    return db('booking_services')
        .transacting(trx)
        .insert(data)
}

exports.updateBooking = (data, condition, trx) => {
    return db('booking').transacting(trx).where(condition).update(data)
}

exports.getBookingById = (id) => {
    return db('booking').where('id', id).first()
}

exports.getBookings = (limit = 5, page = 1) => {
    return db('booking')
        .limit(limit)
        .offset((page - 1) * limit)
}

exports.transaction = () => {
    return db.transaction()
}

exports.countBookings = () => {
    return db('booking').count('id as total').first()
}

exports.deleteBooking = (id) => {
    return db('booking').where('id', id).del()
}

exports.getBookingByEmployeeIdDateFree = (employees_id,date) => {
    return db('booking').where('employees_id', employees_id)
        .where('status', 1)
        .andWhere('booking_date', date)
}

exports.getBookingByDateFree = (date) => {
    return db('booking')
        .where('status', 1)
        .andWhere('booking_date', date)
}

exports.getBookingByBookingId = (bookingId) => {
    return db('booking').where('booking_id', bookingId)
}

exports.getBookingFreeTimeByEmployeeId = (employees_id, from, finishedTime, bookingDate) => {
    return db('booking')
        .where('employees_id', employees_id)
        .andWhere('status', 1)
        .andWhere('booking_date', bookingDate)
        .andWhere(function() {
            this.where(function() {
                this.where('booking_time', '<=', from)
                    .andWhere('finished_time', '>=', from);
            }).orWhere(function() {
                this.where('booking_time', '<=', finishedTime)
                    .andWhere('finished_time', '>=', finishedTime);
            });
        });
}