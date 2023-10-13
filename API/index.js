const express = require('express');
const Post=require("./models/Post");
const cors = require('cors');

//const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 4000;

// Test database connection
const mongoose = require('mongoose');
const dbName = process.env.DB_NAME || 'Animals';
const uri = `mongodb+srv://animalblog:llTPgDKaGX6rjqiv@cluster0.hv9kwab.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

// Get the default connection
const db = mongoose.connection;

// Event handling for successful connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Event handling for connection errors
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});


const CLIENT = process.env.CLIENT || "https://mern-blog-client-sigma.vercel.app";
app.use(cors({
  origin: CLIENT,
  method: ["POST", "GET", "PUT"],
  credentials: true,
}));
app.use(express.json());


 // Increase the timeout (adjust as needed)
app.get('/posts', async (req, res) => {
 try {



  const posts = await Post.find(); 
  res.json(posts);
 
} catch (error) {
console.error('Error fetching posts:', error);
 res.status(500).send('Internal Server Error');
 }

});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
