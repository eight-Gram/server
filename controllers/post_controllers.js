const post = require('../models/post_model')
const comment = require('../models/comment_model')
const jwt = require('jsonwebtoken')

module.exports = {
    addPost (req, res) {
        post.create(req.body)
        .then(function(response) {
            res.status(200).json({
                message: 'Success added new post',
                response
            })
        })
        .catch(function(err) {
            res.status(500).json({
                message: err.message
            })
        })
    },
    deletePost (req, res) {
        post.deleteOne({
            _id: req.params.id
        })
        .then(function(response) {
            res.status(200).json({
                message: 'Success delete post',
                response
            })
        })
        .catch(function(err) {
            res.status(500).json({
                message: err.message
            })
        })
    },
    getPostsByUser (req, res) {
        post.find({
            userId: req.params.Id
        })
        .populate('user')
        .populate('comment')
        .then(function(postData) {
            res.status(200).json({
                message: 'success retrieve data',
                postData
            })
        })
        .catch(function(err) {
            res.status(500).json({
                message: err.message
            })
        })
    },
    addComment (req, res) {
        comment.create({
            username: req.body.username,
            comment_text: req.body.commentText,
            postId: req.params.id
        })
        .then(function(response) {
            post.updateOne({
                _id: req.params.id
            }, {
                $push: {comment: response._id}
            })
            .then(function(responseUpdate) {
                res.status(200).json({
                    message: 'Success added comment',
                    response
                })
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
        })
        .catch(function(err) {
            res.status(500).json({
                message: err.message
            })
        })
    },
    likePost (req, res) {
        const token = req.headers.token
        const postId = req.params.id

        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            post.updateOne({
                _id: postId
            }, {
                $addToSet: { likes: decoded.id }
            })
            .then(function(response) {
                res.status(200).json({
                    message: 'Success like a post',
                    response
                })
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    dislikePost (req, res) {
        const token = req.headers.token
        const postId = req.params.id

        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            post.updateOne({
                _id: postId
            }, {
                $pull: { likes: decoded.id }
            })
            .then(function(response) {
                res.status(200).json({
                    message: 'Success dislike a post',
                    response
                })
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}