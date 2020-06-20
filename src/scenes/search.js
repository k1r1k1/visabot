const Scene = require('telegraf/scenes/base');

const {
		messages: { what_next },
		keyboards: { back }
} = require('../constants/locales.json');
const { getBackKeyboard, getMainKeyboard } = require('../keyboards')

const searchScene = new Scene('search');
searchScene.leave((ctx) => ctx.reply(what_next, getMainKeyboard()));
searchScene.enter(({ reply }) => reply('type text',
			getBackKeyboard()
	)
);

searchScene.on('message', async (ctx) => {
		const {
				reply,
				scene,
				message: {
						text
				}
		} = ctx;

		switch (text) {
				case back:
						await scene.leave('search');
						break;

				default:
						await reply('search results');
						break;
		}
});

module.exports = searchScene;
