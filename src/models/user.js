const { Schema, model } = require('mongoose');

const schema = new Schema({
		id: {
				type: Number,
				required: true
		},
		is_bot: {
				type: Boolean,
				required: true,
		},
		first_name: {
				type: String,
				required: true
		},
		last_name: {
				type: String,
				required: true
		},
		username: {
				type: String,
				required: true
		},
		language_code: {
				type: String,
				required: true
		},
		date: {
				type: Number,
				required: true,
		}
});

module.exports = model('User', schema);
