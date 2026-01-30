const express = require('express');
const cors = require('cors');
const blogRouting = require('./routes/blogRouting');
const authorRouting = require('./routes/authorRouting');

require('./config/dbconfig');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/', blogRouting);
app.use('/', authorRouting);


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);    
})