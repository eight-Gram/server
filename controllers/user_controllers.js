const user = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

module.exports = {
    registerUser ( req, res ) {
        let username = req.body.username;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let password = req.body.password
        let letter = /[a-zA-Z]/; 
        let number = /[0-9]/;
        let goodPassword = letter.test(password) && number.test(password);

        if(password.length < 6){
            res.json({
                message: 'Password too short!'
            })
        } else if (!goodPassword){
            res.json({
                message: 'Password must be alphanumeric'
            })
        } else if (!regexEmail.test(req.body.email)){
            res.json({
                message: 'Incorrect email format'
            })
        } else {
        user.find({
            username: username
        })
        .then(function(userData) {
            if (userData.length !== 0) {
                res.status(400).json({
                    message: 'Username has been taken!'
                })
            } else {
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hash;
                user.create( req.body )
                .then( function ( response ) {
                    const token = jwt.sign({
                        id: response._id,
                        username: response.username,
                        firstname: response.firstname,
                        lastname: response.lastname
                    }, process.env.SECRET)
                    res.status(200).json({
                        message: 'success add new data',
                        response,
                        token
                    })
                })
                .catch(function(err) {
                    res.status(500).json({
                        message: err.message
                    })
                })
            }
        })
        .catch(function(err) {
            res.status(500).json({
                message: err.message
            })
        })
        }
    },
    loginUser (req, res) {
        user.findOne({
            username: req.body.username
        })
        .then(function(response) {
            let authentication = bcrypt.compareSync(req.body.password, response.password)
            if (!authentication) {
                res.status(401).json({
                    message: 'invalid password'
                })
            } else {
                const token = jwt.sign({
                    id: response._id,
                    username: response.username,
                    firstname: response.firstname,
                    lastname: response.lastname
                }, process.env.SECRET)
                res.status(200).json({
                    message: 'login success',
                    token
                })
            }
        })
        .catch(function (err) {
            res.status(500).json({
                message: err.message
            })
        })
    },
    getUser (req, res) {
        const token = req.headers.token
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            user.find()
            .then(function(userData) {
                res.status(200).json({
                    message: 'Success get user data',
                    userData
                })
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    } 
};