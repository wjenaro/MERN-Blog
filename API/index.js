const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

// Test database connection
const DBPassWord = process.env.DB_PASSWORD || "snt5jMT0adajGAZJ";
const DBNAME = process.env.DB_NAME || "Animals";
const USERNAME= process.env.USERNAME || "animalblog";
const DB_URL = `mongodb+srv://${USERNAME}:${DBPassWord}@clustername.mongodb.net/${DBNAME}`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send("Hello World ");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
