const express = require('express');
const blog = require('../models/blogModel')
const loginMiddleware = require('../middleware/loginMiddleware');
const mongoose = require('mongoose');

const blogRouting = express.Router();




blogRouting.get('/Blogs', async (req, res) => {
    try {
        const sdata = await blog.find();
        res.status(200).json(sdata); // ✅ always return 200
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

blogRouting.post('/Blogs', loginMiddleware, async (req, res) => {
    try {
        const {
            title,
            author,
            category,
            description,
            image,
            bio
        } = req.body;
        const sdata = new blog({
            title: title,
            author: author,
            category: category,

            // IMPORTANT FIXES 👇
            content: description,     // content is REQUIRED
            authorId: new mongoose.Types.ObjectId(req.user.id),    // authorId is REQUIRED

            image: image,
            bio: bio,
            date: new Date().toISOString()
        });
        const result = await sdata.save();
        if (result._id) {
            res.status(201).json({ message: "Blog added successfully" });
        }
        else {
            res.status(400).json({ message: "Failed to add blog" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
})

blogRouting.delete('/Blogs/:bid', async (req, res) => {
    try {
        const bid = req.params.bid;
        const result = await blog.deleteOne({ _id: bid });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Blog deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Blog not found" });
        }

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
})

blogRouting.put('/Blogs/:bid', async (req, res) => {
    try {
        const bid = req.params.bid;
        const result = await blog.updateOne({ _id: bid }, { $set: req.body });
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Blog updated successfully" });
        }
        else {
            res.status(404).json({ message: "Blog not found or data is the same" });
        }

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
})

blogRouting.get('/Blogs/author/:authorId', async (req, res) => {
    try {
        const authorId = req.params.authorId;

        const sdata = await blog.find({ authorId: authorId });

        res.status(200).send(sdata);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});

blogRouting.get('/Blogs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sdata = await blog.findOne({ _id: id });
        if (sdata) {
            res.status(200).send(sdata);
        }
        else {
            res.status(404).json({ message: "Blog not found" });
        }

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }

})

blogRouting.post('/Blogs/:id/comments', async (req, res) => {
    try {
        const id = req.params.id;
        const comment = req.body;
        const result = await blog.updateOne(
            { _id: id },
            { $push: { comments: comment } }
        );
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Comment added successfully" });
        }

        else {
            res.status(404).json({ message: "Blog not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
})








module.exports = blogRouting;