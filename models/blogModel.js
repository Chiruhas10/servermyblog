const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    content: { type: String, required: true },
    image: String,
    date: String,
    bio: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    comments: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
