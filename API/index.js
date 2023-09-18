const express=require('express');
const app=express();
const PORT=3001;

app.get('/register', (req, res)=>{
res.send('Test is good');
});

app.listen(PORT, ()=>{
    console.log(`Server at ${PORT}`)
});