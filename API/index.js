const express = require('express');
const mongoose=require('mongoose'); 


const app = express();
const PORT = process.env.PORT || 4000;

//test database connection 
const DBPassWord=process.env.DB_PASSWORD || "snt5jMT0adajGAZJ";
const DBNAME=process.env.DB_NAME || "Animals"; 

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
      console.error('Error connecting to MongoDB:', err);
  } else {
      console.log('Connected to MongoDB successfully');
  }
});

app.get('/', (req, res)=>{
  res.send("Hello World "); 
})


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
