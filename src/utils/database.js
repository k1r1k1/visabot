const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Country = require('../models/country');
const User = require('../models/user');

const PORT = process.env.PORT || 3000
const dbConfig = process.env.DB_CONFIG;

module.exports.dbConnect  = async () => {
		try {
				await mongoose.connect(dbConfig, {
						useNewUrlParser: true,
						useFindAndModify: false,
						useUnifiedTopology: true,
				});
				app.listen(PORT, () => {
						console.log('DB connected successfully');
				})
		} catch (e) {
				console.log('DB connection error', e);
		}
}

module.exports.findCountry = (field, text) => {
		try {
				const queryObj = {};
				if (field !== '' && text !== '') {
						queryObj[field] = { $regex: text, $options: 'i' };
				}
				return Country.find(queryObj);
		} catch	(e) {
				console.error(e);
		}
}

module.exports.saveUser = user => {
		try {
				const query = { id: user.id };
				const newUser = { ...user, date: Date.now() };
				const options = { upsert: true };

				return User.updateOne(query, newUser, options);
		} catch	(e) {
				console.error(e);
		}
}

module.exports.removeUser = user => {
		try {
				const query = { id: user.id };
				return User.deleteOne(query);
		} catch	(e) {
				console.error(e);
		}
}
