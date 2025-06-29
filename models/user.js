const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testapp1')
const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model with fields for image, email, and name.