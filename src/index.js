const Tg = require('telegraf');
require('dotenv').config();

const locales = require('./constants/locales.json');
const { getMainKeyboard, onHearsText } = require('./helper');

const bot = new Tg(process.env.BOT_TOKEN);

bot.start((ctx) => {
		const { reply, update: { message: { from }}} = ctx;
		const { messages: { welcome }} = locales;
		reply(welcome.replace('username', from.username),
					getMainKeyboard()
		);
});

bot.help((ctx) => ctx.reply('Send me a sticker please'));

bot.on('text', (ctx) => onHearsText(ctx));

bot.catch((err, ctx) => {
		console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.launch();
