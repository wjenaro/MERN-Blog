const express = require('express');
const Post=require("./models/Post");
const User=require("./models/User");
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
const bcrypt = require('bcrypt');
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
///Login
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '70a9d0f3ef7205e387e46f7e1a5d83a87f385a0dc2d6d3b3a64256a4f0b0e9d';
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    }).json({ id: user._id, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the login' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
