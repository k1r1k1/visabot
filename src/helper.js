const { Markup } = require('telegraf');
const fetch = require('node-fetch');
const {
		keyboards: {
				main: {
						about,
						contact,
						send_sticker,
						send_cat,
						exit,
						search_country
				},
				back
		},
		messages
} = require('./constants/locales.json');

const getCat = () => {
		return fetch('https://api.thecatapi.com/v1/images/search?size=full')
					.then(res => res.json())
					.then(json => json[0].url)
					.catch(e => {
							console.log(e);
							return 'https://picsum.photos/200/300/';
					})
}

/* const options = {
		reply_markup: JSON.stringify({
				inline_keyboard: [
						[{ text: 'Расскажи о себе', callback_data: 'about_action' }],
						[{ text: 'Пришли мне стикер', callback_data: 'send_sticker' }],
						[{ text: 'Пришли котика', callback_data: 'send_cat' }]
				]
		})
}; */

module.exports.getBackKeyboard = () => {
		const backKeyboardBack = keyboards.back;
		let backKeyboard = Markup.keyboard([backKeyboardBack]);

		backKeyboard = backKeyboard.resize().extra();

		return {
				backKeyboard,
				backKeyboardBack
		};
};

module.exports.getMainKeyboard = () => {
		let mainKeyboard = Markup.keyboard([
				[send_sticker, send_cat],
				[contact, about],
				[exit, search_country],
		]);
		mainKeyboard = mainKeyboard.resize().extra();

		return mainKeyboard;
}

module.exports.onHearsText = async ctx => {
const {
		reply,
		replyWithPhoto,
		message: {
				text
		}
} = ctx;

		switch (text) {
				case about:
						reply(messages.about);
						break;

				case send_sticker:
						reply('😶')
						break;

				case send_cat:
						reply(messages.cat);
						return replyWithPhoto({
								url: await getCat(),
								filename: 'kitten.jpg'
						})

				case exit:
						reply('Всего доброго😌')
						break;

				default:
						reply(messages.something_wrong);
						break;
		}

}
