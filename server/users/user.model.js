const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    bod: {type: String, required: true},
    pictures:{type: String , required: true },
    createdDate: { type: Date, default: Date.now },

   
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);