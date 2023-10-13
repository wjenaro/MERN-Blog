const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000; // Use environment variable for port

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




require('dotenv').config();

const CLIENT = process.env.CLIENT || "https://mern-blog-client-sigma.vercel.app";
const dbName = process.env.DB_NAME || "Animals";
const SERVER_URL = `mongodb+srv://animalblog:${process.env.DB_PASSWORD}@cluster0.hv9kwab.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const secret = process.env.JWT_SECRET || '70a9d0f3ef7205e387e46f7e1a5d83a87f385a0dc2d6d3b3a64256a4f0b0e9d`;

mongoose.connect(SERVER_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


app.use(cors({
  origin: CLIENT,
  method: ["POST", "GET", "PUT"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
      sameSite: 'strict',
    }).json({ id: user._id, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the login' });
  }
});


app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json(decoded);
  });
});


const uploadMiddleware =  multer({ dest: '/tmp/' });//multer({ dest: 'uploads/' });

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
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})


app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
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
      throw err; // Handle this error more gracefully in production
    }

    const { id, title, content } = req.body;
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return res.status(404).json('Post not found');
    }

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).json('You are not the author');
    }

    try {
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
    } catch (updateError) {
      console.error('Error updating post:', updateError);
      res.status(500).json('Internal Server Error');
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
