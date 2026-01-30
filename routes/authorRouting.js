const express = require('express');
const author = require('../models/authorModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginMiddleware = require('../middleware/loginMiddleware');

const authorRouting = express.Router();

authorRouting.get('/Authors', async (re, res) => {
    try {
        const sdata = await author.find();
        if (sdata.length > 0) {
            res.status(200).send(sdata);
        }
        else {
            res.status(404).send("No authors found");
        }

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
})

authorRouting.post('/Authors', async (req, res) => {
    try {
        const { name, email, password } = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        };
        const existingAuthor = await author.findOne({ email });
        if (existingAuthor) {
            return res.status(409).json({ message: "Author already exists" });
        }
        const newAuthor = new author({
            name,
            email,
            password
        });
        await newAuthor.save();
        return res.status(201).json({ message: "Author registered successfully" });

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
})


authorRouting.get('/author/dashboard', loginMiddleware, async(req, res)=>{
    res.send("Author")
})

authorRouting.post('/Authors/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingAuthor = await author.findOne({ email });
        if (!existingAuthor) {
            return res.status(404).json({ message: "Author not found" });
        }
        else if (!bcrypt.compareSync(password, existingAuthor.password)) {
            return res.status(401).json({ message: "Invalid password" });
        }
        else {
            const payload = {
                user : {
                    id:existingAuthor._id   
                }
            }
            // return res.status(200).json({message: "Login successful"});
            jwt.sign(
                payload, "JSONString123", { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.send({ token });
                }
            )
        }

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
})























module.exports = authorRouting;