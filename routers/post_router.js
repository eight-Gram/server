const express = require('express')
const router = express.Router()
const { getAllPosts } = require('../controllers/post_controllers')

router.get('/', getAllPosts)

module.exports = router