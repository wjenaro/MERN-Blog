const Post = require('../models/Post');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const secret = process.env.JWT_SECRET;

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('author', ['username']);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, path } = req.file;
    const ext = path.split('.').pop();
    const newPath = `${path}.${ext}`;
    const { title, content } = req.body;

    fs.renameSync(path, newPath);

    const token = req.cookies.token;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ error: 'Unauthorized' });
      }

      try {
        const newPost = await Post.create({
          title,
          content,
          imageFile: newPath,
          author: decoded.id,
        });
        res.json(newPost);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating a new post' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing post
exports.updatePost = async (req, res) => {
  try {
    let newPath = null;

    if (req.file) {
      const { originalname, path } = req.file;
      const ext = path.split('.').pop();
      newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
    }

    const token = req.cookies.token;

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        throw err;
      }

      const { id, title, content } = req.body;
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json('Post not found');
      }

      const isAuthor = post.author.toString() === info.id;

      if (!isAuthor) {
        return res.status(400).json('You are not the author');
      }

      await Post.updateOne(
        { _id: id },
        {
          $set: {
            title,
            content,
            imageFile: newPath || post.imageFile,
          },
        }
      );

      const updatedPost = await Post.findById(id);
      res.json(updatedPost);
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json('Internal Server Error');
  }
};
