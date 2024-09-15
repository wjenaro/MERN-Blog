const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const uploadMiddleware = require('../utils/uploadMiddleware');

// Get all posts
router.get('/', postController.getPosts);

// Get a post by ID
router.get('/:id', postController.getPostById);

// Create a new post
router.post('/', uploadMiddleware.single('imageFile'), postController.createPost);

// Update a post
router.put('/:id', uploadMiddleware.single('file'), postController.updatePost);

module.exports = router;
