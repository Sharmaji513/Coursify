const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    price: Number,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId, // or String if you prefer
      ref: "Admin", // Optional, if you have a reference to the Admin model
    },
  });

module.exports = mongoose.model('Course' , courseSchema)