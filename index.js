const express = require('express');
const app = express();
const Joi = require('joi');

const currentDate = new Date();
const timestamp = currentDate;


const blogs = [
    {
        id: 1,
        timestamp: timestamp,
        title: 'The Rising Star',
        content: 'A rising star is in the making. Wait for it.',
        author: 'Iroms',
    },
    {
        id: 2,
        timestamp: timestamp,
        title: 'The New Beginning',
        content: 'This beginning is like no other and a kind of its own.',
        author: 'Felix',
    },
    {
        id: 3,
        timestamp: timestamp,
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

// Creating a post on the database 
app.post('/', (req, res) => {
    const { error } = validateBlog(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
    }

    const blog = {
        id: blogs.length + 1,
        timestamp: timestamp, //this is to be generated in a real database
        title: req.body.title,
        content: req.body.content,
        author: req.body.author

    }

    blogs.push(blog);
    res.send(blog);
});

// Updating a post on the database
app.put('/:id', (req, res) => {
    // Checking if the post exists
    const blog = blogs.find(innerBlog => innerBlog.id === parseInt(req.params.id));
    if(!blog) {
        return res.status(404).send('The post you are looking for cannot be found');
    }

    // Validate the blog
    const { error } = validateBlog(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
    }

    // Udate the blog
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.author = req.body.author;
    res.send(blog);
})

// Deleting a blog
app.delete('/:id', (req, res) => {
    // check if the id exists
    const blog = blogs.find(innerBlog => innerBlog.id === parseInt(req.params.id));
    if(!blog) {
        return res.status(404).send('The post you are looking for cannot be found');
    }

    // delete the blog
    const idIndex = blogs.indexOf(blog);
    blogs.splice(idIndex, 1);
    res.send(blog)
})

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