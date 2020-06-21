const { getStartKeyboard } = require('../keyboards');

const { removeUser } = require('../utils/database');

const {
		keyboards: {
				main: {
						about,
						exit,
						search_country,
						contact
				},
				start
		},
		messages,
} = require('../constants/locales.json');

module.exports.sceneManager = async ctx => {
		const {
				reply,
				scene,
				message: { text, from },
		} = ctx;
		switch (text) {
				case about:
						reply(messages.about);
						break;

				case search_country:
						await scene.enter('search');
						break;

				case exit:
						await removeUser(from);
						await reply('Всего доброго 😌', getStartKeyboard());
						await scene.leave();
						break;

				case contact:
						reply(messages.contact);
						break;

				case start:
						await scene.enter('greeter');
						break;

				default:
						reply(messages.something_wrong);
						break;
		}

}
