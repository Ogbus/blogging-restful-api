const express = require('express');
const app = express();
const blogs = require('./routes/blogs')
const users = require('./routes/users')
const mongoose = require('mongoose');
const auth = require('./routes/auth')
//const config = require('config')

// if(!config.get('jwtPrivateKey')) {
//     console.error('FATAL ERROR: jwtPrivateKey is not defined');
//     process.exit(1);
// }

mongoose.connect('mongodb://localhost/blog-com')
    .then(() => console.log('Connected to mongdb...!'))
    .catch(err => console.error('Could not connect to mongodb'))

app.use(express.json());
app.use('/api/blogs', blogs);
app.use('/api/users', users);
app.use('/api/auth', auth)

app.listen(3000, () => {
    console.log('Listening to port 3000...!')
});