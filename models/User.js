const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    createdAt: {type: Date, default: Date.now}
});



module.exports = mongoose.model('User', userSchema)
