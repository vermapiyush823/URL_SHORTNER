const express = require('express');
const connectMongoDb = require('./connect')
const app = express();
const PORT = 5000;
const urlRoute = require('./routes/url')
connectMongoDb("mongodb://127.0.0.1:27017/urlDb").then(()=>{console.log("Database connected")});
app.use('/url',urlRoute);
app.listen(PORT,()=>console.log(`Server started at part : ${PORT}`))