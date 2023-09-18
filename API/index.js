const express=require('express');
const app=express();
const PORT=4000;

app.get('/test', (req, res)=>{
res.send('Test is good');
});

app.listen(PORT, ()=>{
    console.log(`Server at ${PORT}`)
});