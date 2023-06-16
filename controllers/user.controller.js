const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.createUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).send({'error': 'Missing username or password'});
        const isNewUser = await User.inThisEmailInUse(username);
        if (!isNewUser) return res.status(400).send({'error': 'User already registered'});
        const userAdd = await User.createUser({username, password});
        if (userAdd.length === 0) return res.status(400).send({'error': 'Error when create user'})
        const user = await User.findUserById(userAdd[0])
        return res.json({success: true, user})
    }catch (e) {
        console.log(e)
        return res.status(500).send({'error': 'Internal server error'})
    }
}


exports.userSignIn = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).send({'error': 'Missing username or password'});

    try {
        const user = await User.findUserByUserName(username);
        if (!user) return res.status(400).send({'error': 'User not found'});

        const isPasswordMatch = await User.comparePassword(password, user.password);
        if (!isPasswordMatch) return res.status(400).send({'error': 'Password is incorrect'});

        if (user.tokens) {
            try {
                const decoded = jwt.verify(user.tokens, process.env.JWT_SECRET);
                if (decoded.exp > Date.now() / 1000) {
                    return res.json({'status': 'success', user});
                }
            } catch (err) {
                const newToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '10000000000y'});
                await User.findByIdAndUpdateToken(user.id, newToken);
                return res.json({'status': 'success', user, token: newToken});
            }
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '10000000000y'});
        await User.findByIdAndUpdateToken(user.id, token);
        return res.json({'status': 'success', user, token});
    } catch (err) {
        return res.status(500).send({'error': 'Internal server error'});
    }
}
exports.signOut = async (req, res) => {
    try{
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({"status": "fail", message: 'Authorization fail!'});
            }

            await User.findByIdAndUpdateToken(req.user.id, null);
            res.json({"status": "success", message: 'Sign out successfully!'});
        }
    }catch (e) {
        return res.status(500).send({'error': 'Internal server error'});
    }

};
