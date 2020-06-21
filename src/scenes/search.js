const Scene = require('telegraf/scenes/base');

const {
		messages,
		keyboards: { back }
} = require('../constants/locales.json');
const { getBackKeyboard, getMainKeyboard } = require('../keyboards');
const { findCountry } = require('../utils/database');
const { getCountriesKeyboard, chooseCountryAction } = require('../utils/helper');

const searchScene = new Scene('search');

searchScene.leave(({ reply }) => reply(messages.what_next, getMainKeyboard()));
searchScene.enter(({ reply }) => reply(messages.searching, getBackKeyboard()));
searchScene.action(/chooseCountry/, chooseCountryAction);

searchScene.on('message', async ({
			reply,
			scene,
			message: {
					text
			}
	}) => {
		if (text === back)	return scene.leave('search');

		const result = await findCountry('name', text);
		if (!result.length) return await reply(messages.not_found);

		await reply(messages.look_found, getCountriesKeyboard(result));
});

module.exports = searchScene;
