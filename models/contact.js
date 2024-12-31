const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {type: String, default: '', require: true},
    lastName: {type: String, default: '', require: true},
    email: {type: String, default: '', require: true},
    phoneNo1: {type: Number, default: 0, require: true},
    phoneNo2: {type: Number, default: 0},
    state: {type: String, default: '', require: true},
    city: {type: String, default: '', require: true},
    address: {type: String, default: '', require: true},
    message: {type: String, default: ''},
})

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;
