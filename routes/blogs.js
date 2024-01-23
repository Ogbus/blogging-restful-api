const express = require('express');
const router = express.Router();
const { Blog, validate } = require('../models/blog')
const asyncMiddleware = require('../middleware/async')

// const blogs = [
//     {
//         id: 1,
//         timestamp: timestamp,
//         title: 'The Rising Star',
//         content: 'A rising star is in the making. Wait for it.',
//         author: 'Iroms',
//     },
//     {
//         id: 2,
//         timestamp: timestamp,
//         title: 'The New Beginning',
//         content: 'This beginning is like no other and a kind of its own.',
//         author: 'Felix',
//     },
//     {
//         id: 3,
//         timestamp: timestamp,
//         title: 'The Standing Order',
//         content: 'There is a need for a good standing order to be in place.',
//         author: 'Felix',
//     }
// ]

// Reading all the items from the database
router.get('/', asyncMiddleware(async (req, res) => {
    const blogs = await Blog.find().sort('title, content, author')
    res.send(blogs);
}))

// Getting an item from the database
router.get('/:id', asyncMiddleware(async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id)
    //const findBlog = blogs.find(blog => blog.id === parseInt(req.params.id));
    if(!blog) {
        return res.status(404).send('The id you are looking for does not exist');
    } else {
        res.send(blog);
    }
}));

// Creating a post on the database 
router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
    }

    let blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author

    })

    blog = await blog.save();
    res.send(blog);
}));

// Updating a post on the database
router.put('/:id', asyncMiddleware(async (req, res) => {
    // Validate the blog
    const { error } = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
    }

    // Checking if the post exists
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }, {
        new: true
    });

    if(!blog) {
        return res.status(404).send('The post you are looking for cannot be found');
    }

    // Udate the blog
    res.send(blog);
}))

// Deleting a blog
router.delete('/:id', asyncMiddleware(async (req, res) => {
    // check if the id exists
    //const blog = blogs.find(innerBlog => innerBlog.id === parseInt(req.params.id));
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if(!blog) {
        return res.status(404).send('The post you are looking for cannot be found');
    }

    // delete the blog
    res.send(blog)
}));

module.exports = router;