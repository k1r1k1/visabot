const {
		keyboards: {
				main: {
						about,
						exit,
						search_country,
						contact
				},
		},
		messages
} = require('../constants/locales.json');

module.exports.sceneManager = async ctx => {
		const {
				reply,
					scene,
				message: {
						text
				}
		} = ctx;
		switch (text) {
				case about:
						reply(messages.about);
						break;

				case search_country:
						await scene.enter('search');
						break;

				case exit:
						reply('Всего доброго 😌')
						break;

				case contact:
						reply(messages.contact)
						break;

				default:
						reply(messages.something_wrong);
						break;
		}

}
