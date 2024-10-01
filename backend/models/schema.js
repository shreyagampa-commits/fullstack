
const mongoose = require('mongoose');

// Use mongoose.Schema to define the schema
const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Correct reference to User schema
});

// Create and export the Image model
const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
