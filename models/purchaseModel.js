const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: ObjectId,
    courseId: ObjectId
});


module.exports = mongoose.model('Purchase', purchaseSchema);