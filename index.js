require('dotenv').config()
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
module.exports = client

client.commandsSlash = new Collection();

['commands', 'events'].forEach(handler => require(`./src/handlers/${handler}`)(client));

client.login(process.env.DISCORD_TOKEN);