const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET;

// Login a user
exports.loginUser = async (req, res) => {
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

    const token = jwt.sign({ username, id: user._id }, secret, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
    });

    res.json({ id: user._id, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the login' });
  }
};

// Profile route
exports.getProfile = (req, res) => {
  const token = req.cookies.token;

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
      secure: process.env.NODE_ENV === "production",
      sameSite: 'none',
    });

    res.json(decoded);
  });
};

// Logout
exports.logoutUser = (req, res) => {
  res.clearCookie('token').json('ok');
};
