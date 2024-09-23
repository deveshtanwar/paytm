const { Schema, model } = require('mongoose');

const userSchema = Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    token: { type: String }

}, { versionKey: false, timestamps: true })

module.exports = model('users', userSchema);