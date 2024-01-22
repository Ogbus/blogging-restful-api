const express = require('express');
const app = express();
const Joi = require('joi');


const blogs = [
    {
        id: 1,
        timestamp: '10-01-2024, 16:24:30',
        title: 'The Rising Star',
        content: 'A rising star is in the making. Wait for it.',
        author: 'Iroms',
    },
    {
        id: 2,
        timestamp: '09-30-2023, 11:24:30',
        title: 'The New Beginning',
        content: 'This beginning is like no other and a kind of its own.',
        author: 'Felix',
    },
    {
        id: 3,
        timestamp: '02-06-2023, 05:29:30',
        title: 'The Standing Order',
        content: 'There is a need for a good standing order to be in place.',
        author: 'Felix',
    }
]

app.use(express.json());

// Reading all the items from the database
app.get('/', (req, res) => {
    res.send(blogs);
})

// Getting an item from the database
app.get('/:id', (req, res) => {
    const findBlog = blogs.find(blog => blog.id === parseInt(req.params.id));
    if(!findBlog) {
        return res.status(404).send('The id you are looking for does not exist');
    } else {
        res.send(findBlog);
    }
});

// Creating a database on the database 


// Validating the database
function validateBlog(blog) {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(15).required(),
        author: Joi.string().min(5).required()
    })

    return schema.validate(blog);
}

app.listen(3000, () => {
    console.log('Listening to port 3000...!')
});