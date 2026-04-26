const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, require: true },
    email: { type: String, require: false },
    createdAt: {type: Date, default: Date.now}
});


userSchema.pre('save', async function (next) {
    if (this.isModified('username')) {
        this.username = this.username.toLowerCase();
    }
    next();
});
module.exports = mongoose.model('User', userSchema)
