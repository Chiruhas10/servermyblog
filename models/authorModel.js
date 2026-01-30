const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'author'
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/17/17004.png"
        },
        password: {
            type: String,
            required: true
        },



    }
)

module.exports = mongoose.model('authors', authorSchema);