require('dotenv').config();
const Tg = require('telegraf');

const bot = new Tg(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker please'));
bot.on('sticker', (ctx) => ctx.reply('😶'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch();
