const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your client's origin
  credentials: true, // Include credentials (cookies) in CORS requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const dbName = 'Users';
const secret = 'osnjwojedininff/sds'; // Note: Change this to a more secure secret in production

const User = require('./models/User');

mongoose.connect('mongodb://0.0.0.0:27017/blogMern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
      return res.status(401).json({ error: 'Username or password is incorrect' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Username or password is incorrect' });
    }

    jwt.sign({ username, password }, secret, {}, (error, token) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while generating the token' });
      }

      // Move this inside the success case
      console.log(token);

      res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Set to true if your application is running over HTTPS
        sameSite: 'strict', // Adjust this according to your requirements
      }).json({ 
        id:userDoc._id,
        username,

       });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the login' });
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Pass the decoded payload to the response
    res.json(decoded);
  });
});

app.post('/logout', (req, res)=>{
  res.cookie('token', '').json('ok');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
