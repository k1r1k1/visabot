const Scene = require('telegraf/scenes/base');

const locales = require('../constants/locales.json');
const { getMainKeyboard } = require('../keyboards')

const sayHi = ctx => {
		const { reply, update: { message: { from }}} = ctx;
		const { messages: { welcome }} = locales;
		reply(welcome.replace('username', from.username),
					getMainKeyboard()
		);
}

const greeter = new Scene('greeter');
greeter.enter((ctx) => sayHi(ctx));
greeter.leave((ctx) => ctx.reply('Greeter Bye'));
greeter.on('message', (ctx) => ctx.reply('Greeter hi'));

module.exports = greeter;
