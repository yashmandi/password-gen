const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
});

module.exports = mongoose.model("User", userSchema);