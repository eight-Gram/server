const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = mongoose.Schema({
    username: String,
    comment_text: String,
    postId: {type: Schema.Types.ObjectId, ref: 'post'}
}, {
    timestamps: true
})

const comment = mongoose.model('comment', commentSchema)

module.exports = comment;