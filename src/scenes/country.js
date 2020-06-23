const Scene = require('telegraf/scenes/base');
const {
		messages,
		keyboards: { back }
} = require('../constants/locales.json');
const { getBackKeyboard } = require('../keyboards');
const { getVisasButton } = require('../utils/helper');
const { saveUser } = require('../utils/database');

const countryScene = new Scene('country');

countryScene.enter(async ({ reply, session, scene }) => {
		const {
				chosenCountry: [{
						name,
						flag,
						visas
				}]
		} = session;
		const replyMessage = `${messages.chosed_country} ${name} ${flag}\n${messages.visa_types}`;
		await reply(replyMessage, getBackKeyboard());

		if (!visas.length) {
				await reply(messages.not_found2);
				scene.enter('search');
		}
		visas.forEach((visa, index) => {
				reply(`☑️ ${visa.name}\n${visa.description}`, getVisasButton(visa.name, index))
		})
});

countryScene.action(/openVisa/, async ({
			session,
			reply,
			callbackQuery,
			answerCbQuery
}) => {
		const { code } = JSON.parse(callbackQuery.data);
		const {
				chosenCountry: [{
						visas,
				}]
		} = session;
		const { text, name } = visas[code];
		const messagesArray = text.match(/(.|[\r\n]){1,4096}/g)
		await reply(`ℹ Дополнительная информация о визе "${name}"`);
		for (const message of messagesArray) {
				await reply(message);
		}
		return answerCbQuery();
});

countryScene.action(/addChecklist/, async ({
			session,
			update,
			reply,
			callbackQuery,
			answerCbQuery
	}) => {
		const { code } = JSON.parse(callbackQuery.data);
		const { from } = callbackQuery;
		const {	chosenCountry: [{	visas }] } = session;
		const { list, name } = visas[code];
		await saveUser({ ...from, checklist: list });
		await reply(`✅ "${name}" теперь в вашем чеклисте!`);
		return answerCbQuery();
});

module.exports = countryScene;
