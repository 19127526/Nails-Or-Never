const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {userResponse} = require('../utils/mapper');
const otpGenerator = require('otp-generator')
const emailjs = require('@emailjs/nodejs');

exports.createUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).send({'error': 'Missing username or password'});
        const isNewUser = await User.inThisEmailInUse(username);
        if (!isNewUser) return res.status(400).send({'error': 'User already registered'});
        const userAdd = await User.createUser({username, password});
        if (userAdd.length === 0) return res.status(400).send({'error': 'Error when create user'})
        const user = await User.findUserById(userAdd[0])
        const newToken = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: '10000000000y'});
        await User.findByIdAndUpdateToken(user.id, newToken);
        return res.json({success: true})
    } catch (e) {
        console.log(e)
        return res.status(500).send({'error': 'Internal server error'})
    }
}

exports.createAdmin = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).send({'error': 'Missing username or password'});
        const isNewUser = await User.inThisEmailInUse(username);
        if (!isNewUser) return res.status(400).send({'error': 'User already registered'});
        const userAdd = await User.createAdmin({username, password});
        if (userAdd.length === 0) return res.status(400).send({'error': 'Error when create user'})
        const user = await User.findUserById(userAdd[0])
        const newToken = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: '1d'});
        await User.findByIdAndUpdateToken(user.id, newToken);
        return res.json({success: true})
    } catch (e) {
        console.log(e)
        return res.status(500).send({'error': 'Internal server error'})
    }
}

exports.userSignIn = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findUserByUserName(username);
        if (!user) return res.status(400).send({'error': 'User not found'});

        const isPasswordMatch = await User.comparePassword(password, user.password);
        if (!isPasswordMatch) return res.status(400).send({'error': 'Password is incorrect'});

        const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false});
        await User.findByIdAndUpdateOTP(user.id, otp);
        const template = {
            otp,
            to_email: "englishsohard1@gmail.com",
        }
        emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_2_ID, template, {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
        }).then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
        return res.json({success: true})
    } catch (err) {
        return res.status(500).send({'error': 'Internal server error'});
    }
}

exports.userSignInCheckOTP = async (req, res) => {
    try {
        const {username, password, otp} = req.body;
        const user = await User.findUserByUserName(username);
        if (!user) return res.status(400).send({'error': 'User not found'});
        if (user.otp !== otp) return res.status(400).send({'error': 'OTP is incorrect'});
        const isPasswordMatch = await User.comparePassword(password, user.password);
        if (!isPasswordMatch) return res.status(400).send({'error': 'Password is incorrect'});

        let expiredTime = ''
        if (user.role === 'ADMIN') {
            expiredTime = '1d'
        } else if (user.role === 'USER') {
            expiredTime = '10000000000y'
        }
        if (user.token) {
            try {
                const decoded = jwt.verify(user.token, process.env.JWT_SECRET);
                if (decoded.exp > Date.now() / 1000) {
                    return res.json({'status': 'success', user: userResponse(user)});
                }
            } catch (err) {
                const newToken = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: expiredTime});
                await User.findByIdAndUpdateToken(user.id, newToken);
                return res.json({'status': 'success', user: userResponse(user), token: newToken});
            }
        }

        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: expiredTime});
        await User.findByIdAndUpdateToken(user.id, token);
        return res.json({'status': 'success', user: userResponse(user), token});
    } catch (e) {
        console.log(e)
        return res.status(500).send({'error': 'Internal server error'});
    }
}

exports.signOut = async (req, res) => {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({"status": "fail", message: 'Authorization fail!'});
            }
            await User.findByUserNameAndUpdateToken(req.user.username, null);
            res.json({"status": "success", message: 'Sign out successfully!'});
        }
    } catch (e) {
        return res.status(500).send({'error': 'Internal server error'});
    }
};

exports.forgotPassword = async (req, res) => {

}