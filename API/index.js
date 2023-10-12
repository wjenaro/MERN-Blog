const express =require('express');
const app =express();
//initialise Port
const PORT =process.env.PORT || 4000;



//listening to server
app.listen(PORT, ()=>{
  console.log(`server at ${PORT}`);
});

