const express=require('express');
const app=express();
const PORT=4000;

app.get('/register', (req, res)=>{
res.send('Test is good');
});

app.listen(PORT, ()=>{
    console.log(`Server at ${PORT}`)
});