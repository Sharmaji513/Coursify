const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId:  mongoose.Schema.Types.ObjectId
});


module.exports = mongoose.model('Course' , courseSchema)