const Tg = require('telegraf');
const express = require('express');
const mongoose = require('mongoose');
const session = require('telegraf/session')
const Stage = require('telegraf/stage');
require('dotenv').config();

const app = express();

const bot = new Tg(process.env.BOT_TOKEN);
const PORT = process.env.PORT || 3000
const dbConfig = process.env.DB_CONFIG;

const { sceneManager } = require('./scenes');
const greeter = require('./scenes/greeting');
const searchScene = require('./scenes/search');

const stage = new Stage();
stage.register(greeter);
stage.register(searchScene);

bot.use(session())
bot.use(stage.middleware());

bot.start( ({ scene }) => {
		scene.enter('greeter');
});

bot.help((ctx) => ctx.reply('Send me a sticker please'));

bot.on('text', (ctx) => {
		sceneManager(ctx)
});

bot.catch((err, ctx) => {
		console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
});

async function dbConnect() {
		try {
				await mongoose.connect(dbConfig, {
						useNewUrlParser: true,
						useFindAndModify: false,
						useUnifiedTopology: true,
				});
				app.listen(PORT, () => {
						console.log('DB connected successfully');
				})
		} catch (e) {
				console.log('DB connection error', e);
		}
}

// dbConnect();

bot.launch();
