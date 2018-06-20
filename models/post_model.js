const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    pictureUrl: String,
    description: String,
    likes: [{type: Schema.Types.ObjectId, ref: 'user'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
}, {
    timestamps: true
})

let post = mongoose.model('post', postSchema);

module.exports = post;
