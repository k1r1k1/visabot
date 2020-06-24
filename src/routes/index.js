const { Router } = require('express');
const Country = require('../models/country');
const User = require('../models/user');
const router = Router();

router.get('/', async (req, res) => {
		const countries = await Country.find({});
		const users = await User.find({});

		const newCountries = countries.map(item => {
				return {
						id: item._id,
						code: item.code,
						name: item.name
				}
		});

		res.render('index', {
				title: 'Admin panel',
				isIndex: true,
				data: newCountries,
		});
});

module.exports = router;