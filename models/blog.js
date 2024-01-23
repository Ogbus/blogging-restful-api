const mongoose = require('mongoose');
const Joi = require('joi');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },

    author: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
}, { timestamps: true});

const Blog = mongoose.model('Blogs', blogSchema)

// Validating the database
function validateBlog(blog) {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(15).required(),
        author: Joi.string().min(5).required()
    })

    return schema.validate(blog);
}

exports.Blog = Blog;
exports.validate = validateBlog;
exports.blogSchema = blogSchema;

