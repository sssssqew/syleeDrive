const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Img = new Schema({
	category: String,
	name: String,
	path: String,
	date: {
		created: { type: Date, default: Date.now },
		edited: { type: Date, default: Date.now }
	},
	is_edited: { type: Boolean, default: false }
});

module.exports = mongoose.model('img', Img);