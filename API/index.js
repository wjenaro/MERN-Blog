const express = require('express');
const Post = require("./models/Post");
const User = require("./models/User");
const cors = require('cors');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config();

// Test database connection
const dbName = process.env.DB_NAME || 'Animals';
const USERNAME=process.env.DB_USERNAME || "animalblog";
const PASSWORD=process.env.DB_PASSWORD || "qYgip4zqvhp4rbUG"; 
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hv9kwab.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const secret = process.env.JWT_SECRET || '70a9d0f3ef7205e387e46f7e1a5d83a87f385a0dc2d6d3b3a64256a4f0b0e9d';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const CLIENT = process.env.CLIENT || "https://mern-blog-client-sigma.vercel.app";
app.use(cors({
  origin: CLIENT,
  methods: ["POST", "GET", "PUT"],
  credentials: true,
}));

// Middleware for setting security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.json());
app.use(cookieParser());





 //fetch data to populate the homepage  
 app.get('/posts', async (req, res) => {
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
});
//register

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    const token = jwt.sign({ username, id: user._id }, secret, { expiresIn: '1h', algorithm: 'HS256' });

    res.cookie('token', token).json({ id: user._id, username });
    res.send("Try");

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the login' });
  }


  
});

app.get("/", (req, res)=>{
  res.send("Working");
});
//profile 
app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: not found' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: 'none',
    });

    res.json(decoded);
  });
});



const uploadMiddleware = multer({ dest: '/tmp/' });

app.post('/logout', (req, res) => {
  res.clearCookie('token').json('ok');
});
app.post('/cpost', uploadMiddleware.single('imageFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;

    const { title, content } = req.body;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ error: 'Unauthorized' });
      }

      try {
        const newPostData = await Post.create({
          title,
          content,
          imageFile: newPath,
          author: decoded.id,
        });

        res.json(newPostData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating a new post' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/posts', async (req, res) => {
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
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  try {
    let newPath = null;

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        throw err;
      }

      const { id, title, content } = req.body;
      const postDoc = await Post.findById(id);

      if (!postDoc) {
        return res.status(404).json('Post not found');
      }

      const isAuthor = postDoc.author.toString() === info.id;

      if (!isAuthor) {
        return res.status(400).json('You are not the author');
      }

      await Post.updateOne(
        { _id: id },
        {
          $set: {
            title,
            content,
            cover: newPath ? newPath : postDoc.cover,
          },
        }
      );

      // Fetch the updated post
      const updatedPost = await Post.findById(id);

      res.json(updatedPost);
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json('Internal Server Error');
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error, or log, or throw as appropriate
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
