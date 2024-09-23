const { Schema, model, Types } = require('mongoose');

const accountSchema = Schema({
    userId: { type: Types.ObjectId, ref: 'users', required: true },
    balance: { type: Number, required: true }
}, { versionKey: false, timestamps: true });

module.exports = model('balance', accountSchema)