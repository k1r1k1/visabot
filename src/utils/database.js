const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');

const Country = require('../models/country');
const User = require('../models/user');

const PORT = process.env.PORT || 3000
const dbConfig = process.env.DB_CONFIG;

// admin panel

const Routes = require('../routes');

const app = express();
const hbs = exphbs.create({
		defaultLayout: 'main',
		extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true })); // for parsing in queries
app.use(express.static(path.join(__dirname, '/../../public')));
app.use(Routes);

module.exports.dbConnect  = async () => {
		try {
				await mongoose.connect(dbConfig, {
						useNewUrlParser: true,
						useFindAndModify: false,
						useUnifiedTopology: true,
				});
				app.listen(PORT, () => {
						console.log('[APP] DB connected');
				})
		} catch (e) {
				console.log('[APP] DB connection error', e);
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

module.exports.findUser = userId => {
		try {
				return User.findOne({ id: userId });
		} catch	(e) {
				console.error(e);
		}
}
