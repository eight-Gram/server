const express = require('express')
const router = express.Router()
const { getAllPosts,
        addPost,
        deletePost,
        getPostsByUser,
        addComment,
        likePost,
        unlikePost,
        editDescription } = require('../controllers/post_controllers')
const upload = require('../middleware/upload')

router.get('/', getAllPosts)

router.get('/:userId', getPostsByUser)

router.delete('/:postId', deletePost)

router.post('/', upload.multer.single('img'), upload.sendUploadToGCS, addPost)

router.post('/comment/:postId', addComment)

router.put('/like/:postId', likePost)

router.put('/unlike/:postId', unlikePost)

router.put('/:postId', editDescription)

module.exports = router