const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 4000;

// Test database connection
const DB_PASSWORD = process.env.DB_PASSWORD || "snt5jMT0adajGAZJ";
const DB_NAME = process.env.DB_NAME || "Animals";
const USERNAME = process.env.USERNAME || "animalblog";
const CLUSTER_NAME = process.env.CLUSTER_NAME || "cluster0"; // Replace with your actual cluster name
const DB_URL = `mongodb+srv://${USERNAME}:${DB_PASSWORD}@${CLUSTER_NAME}.mongodb.net/${DB_NAME}`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
