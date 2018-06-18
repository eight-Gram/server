const user = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

module.exports = {
    registerUser ( req, res ) {
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
    },
    loginUser (req, res) {
        user.find({
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
    } 
};