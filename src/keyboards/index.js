const { Markup } = require('telegraf');
const {
		keyboards: {
				main: {
						about,
						contact,
						exit,
						search_country
				},
				back
		},
} = require('../constants/locales.json');

module.exports.getBackKeyboard = () => {
		let backKeyboard = Markup.keyboard([back]);
		backKeyboard = backKeyboard.resize().extra();

		return backKeyboard;
};

module.exports.getMainKeyboard = () => {
		let mainKeyboard = Markup.keyboard([
				[contact, about],
				[exit, search_country],
		]);
		mainKeyboard = mainKeyboard.resize().extra();

		return mainKeyboard;
}