const Tg = require('telegraf');

const session = require('telegraf/session')
const Stage = require('telegraf/stage');
require('dotenv').config();

const bot = new Tg(process.env.BOT_TOKEN);

const greeter = require('./scenes/greeting');
const searchScene = require('./scenes/search');
const countryScene = require('./scenes/country');

const { dbConnect } = require('./utils/database');

const stage = new Stage();
stage.register(greeter);
stage.register(searchScene);
stage.register(countryScene);

bot.use(session())
bot.use(stage.middleware());

bot.start( ({ scene }) => {
		scene.enter('greeter');
});

bot.help((ctx) => ctx.reply('Send me a sticker please'));

bot.on('text', async ({ scene }) => {
		await scene.enter('greeter');
});

bot.catch((err, ctx) => {
		console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
});

(async function () {
		dbConnect()
					.then(async () => {
								await bot.launch();
								console.log('[APP] bot started');
						})
					.catch(e => console.log(e));
})();
