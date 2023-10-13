const express = require('express');
const mongoose = require('mongoose');
const Post="./models/Post"; 

const app = express();
const PORT = process.env.PORT || 4000;

// Test database connection
const DBPassWord = process.env.DB_PASSWORD || "snt5jMT0adajGAZJ";
const DBNAME = process.env.DB_NAME || "Animals";
const USERNAME = process.env.USERNAME || "animalblog";
const DB_URL = `mongodb+srv://${USERNAME}:${DBPassWord}@clustername.mongodb.net/${DBNAME}`;

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
    // Getting data from the Post collection
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
