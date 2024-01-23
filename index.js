const express = require('express');
const app = express();
const blogs = require('./routes/blogs')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog-com')
    .then(() => console.log('Connected to mongdb...!'))
    .catch(err => console.error('Could not connect to mongodb'))

app.use(express.json());
app.use('/api/blogs', blogs)

app.listen(3000, () => {
    console.log('Listening to port 3000...!')
});