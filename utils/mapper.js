function userResponse(user) {
    const {id, username, email, role, token} = user
    return {id, username, email, role, token}
}

module.exports = {
    userResponse
}
