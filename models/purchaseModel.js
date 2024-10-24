const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const purchaseSchema = new mongoose.Schema({
    userId: ObjectId,
    courseId: ObjectId
});


module.exports = mongoose.model('Purchase', purchaseSchema);