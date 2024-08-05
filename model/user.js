const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactschema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const ContactUser = mongoose.model('User',contactschema)

module.exports = ContactUser