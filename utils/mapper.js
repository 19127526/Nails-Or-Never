function userResponse(user) {
    const {id, username, email, role, token} = user
    return {id, username, email, role, token}
}

function parseLimit(limit) {
    return parseInt(limit) || 5
}

function parsePage(page) {
    return parseInt(page) || 1
}

module.exports = {
    userResponse,
    parseLimit,
    parsePage
}