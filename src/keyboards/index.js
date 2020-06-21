const { Markup } = require('telegraf');
const {
		keyboards: {
				main: {
						about,
						contact,
						exit,
						search_country,
						show_lists,
						show_no_visa
				},
				back,
				start
		},
} = require('../constants/locales.json');

module.exports.getStartKeyboard = () => {
		let startKeyboard = Markup.keyboard([start]);
		startKeyboard = startKeyboard.resize().extra();

		return startKeyboard;
};

module.exports.getBackKeyboard = () => {
		let backKeyboard = Markup.keyboard([back]);
		backKeyboard = backKeyboard.resize().extra();

		return backKeyboard;
};

module.exports.getMainKeyboard = () => {
		let mainKeyboard = Markup.keyboard([
				[about, search_country],
				[contact, show_no_visa],
				[exit, show_lists],
		]);
		mainKeyboard = mainKeyboard.resize().extra();

		return mainKeyboard;
}