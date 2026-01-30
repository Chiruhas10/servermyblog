const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    date: {
      type: String
    },
    bio: {
      type: String
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    comments: [
      {
        text: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]


  },
  { timestamps: true }
);

module.exports = mongoose.model('blogs', blogSchema);