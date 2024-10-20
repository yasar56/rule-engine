// backend/models/Rule.js
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true },
    ast: { type: Object, required: true }, // Store the AST as an object
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rule', ruleSchema);
