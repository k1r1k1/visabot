const { getCheckListText } = require('../utils/helper');
const { findUser } = require('../utils/database');
const { getStartKeyboard } = require('../keyboards');
// const { removeUser } = require('../utils/database');

const {
		keyboards: {
				main: {
						about,
						exit,
						search_country,
						contact,
						show_checklist
				},
				start,
				force_exit
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
				case force_exit:
						// await removeUser(from);
						await reply('Всего доброго 😌', getStartKeyboard());
						await scene.leave('greeter');
						break;

				case contact:
						reply(messages.contact);
						break;

				case start:
						await scene.enter('greeter');
						break;

				case show_checklist:
						const { checklist } = await findUser(from.id);
						await reply(getCheckListText(checklist));
						break;

				default:
						reply(messages.something_wrong);
						break;
		}

}
