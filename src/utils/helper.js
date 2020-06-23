const { Extra } = require('telegraf');
const { findCountry } = require('../utils/database');
const { keyboards: { detail, add_list } } = require('../constants/locales.json');

module.exports.getCountriesKeyboard = countries =>
			Extra.HTML().markup((m) => {
				const buttons = countries.map(({ name, code, flag }) => {
						return m.callbackButton(`${name} ${flag}`, JSON.stringify({ action: 'chooseCountry', code: code }), false)
				});

				return m.inlineKeyboard(buttons,{});
		});

module.exports.getVisasButton = (name, index) =>
			Extra.HTML().markup((m) => {
				const openButton = m.callbackButton(detail, JSON.stringify({ action: 'openVisa', code: index }), false)
				const addCheckButton = m.callbackButton(add_list, JSON.stringify({ action: 'addChecklist', code: index }), false)

				return m.inlineKeyboard([openButton, addCheckButton],{});
		});

module.exports.chooseCountryAction = async ({
		callbackQuery,
		answerCbQuery,
		session,
		scene
}) => {
		const { code } = JSON.parse(callbackQuery.data);
		const result = await findCountry('code', code);
		session.chosenCountry = result;
		await scene.enter('country');
		return answerCbQuery();
};

module.exports.getCheckListText = arr => {
		const newArr = arr.map(item => `✅ ${item}`);
		return newArr.join('\n');
}
