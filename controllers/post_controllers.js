const post = require('../models/post_model')
const comment = require('../models/comment_model')
const jwt = require('jsonwebtoken')

module.exports = {
    addPost (req, res) {
        const token = req.headers.token
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            post.create({
                userId: decoded.id,
                pictureUrl: req.file.cloudStoragePublicUrl,
                description: req.body.description,
                likes: [],
                comments: []
            })
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
        
        } catch (error) {
                
        }
    },
    deletePost (req, res) {
        post.deleteOne({
            _id: req.params.postId
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
            userId: req.params.userId
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
            postId: req.params.postId
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
    editDescription (req, res) {
        const token = req.headers.token
        const postId = req.params.postId

        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            post.updateOne({
                _id: postId
            }, {
                description: req.body.description
            })
            .then(function(response) {
                res.status(200).json({
                    message: 'Success edit description',
                    response
                })
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
        } catch (error) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    likePost (req, res) {
        const token = req.headers.token
        const postId = req.params.postId

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
    unlikePost (req, res) {
        const token = req.headers.token
        const postId = req.params.postId

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