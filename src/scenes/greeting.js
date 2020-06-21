const Scene = require('telegraf/scenes/base');

const { sceneManager } = require('./index');
const locales = require('../constants/locales.json');
const { getMainKeyboard } = require('../keyboards');
const { saveUser } = require('../utils/database');

const sayHi = async ({ reply, update }) => {
		const { message: { from }} = update;
		const { messages: { welcome }} = locales;
		await saveUser(from);
		reply(welcome.replace('username', from.username),
					getMainKeyboard()
		);
}

const greeter = new Scene('greeter');
greeter.enter((ctx) => sayHi(ctx));
greeter.on('message', (ctx) => sceneManager(ctx));

module.exports = greeter;
