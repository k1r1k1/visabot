const { Extra } = require('telegraf');
const { findCountry } = require('../utils/database');

module.exports.getCountriesKeyboard = countries => {

		return Extra.HTML().markup((m) => {
				const buttons = countries.map(({ name, code, flag }) => {
						return m.callbackButton(`${name} ${flag}`, JSON.stringify({ action: 'chooseCountry', code: code }), false)
				});

				return m.inlineKeyboard(buttons,{});
		});
}

module.exports.chooseCountryAction = async ({ callbackQuery, answerCbQuery, reply }) => {
		const { code } = JSON.parse(callbackQuery.data);
		const result = await findCountry('code', code);
		await reply(`Вы выбрали ${JSON.stringify(result)}`);
		return answerCbQuery();
};
