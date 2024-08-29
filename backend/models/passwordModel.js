const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passwordSchema = new Schema({
    website: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("Password", passwordSchema);