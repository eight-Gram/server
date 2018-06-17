const post = require('../models/post_model')
const comment = require('../models/comment_model')

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
    getAllPosts (req, res) {
        post.find()
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
    }
}