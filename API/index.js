const express = require('express');


const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res)=>{
  res.send("hello"); 
})


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
