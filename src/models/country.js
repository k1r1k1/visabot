const { Schema, model } = require('mongoose');

const schema = new Schema({
		name: {
				type: String,
				required: true
		},
		description: {
				type: String,
				required: true
		},
		code: {
				type: String,
				required: true
		},
		flag: {
				type: String,
				required: true
		},
		visas: {
				type: Array,
				default: []
		},
});

module.exports = model('Country', schema);
