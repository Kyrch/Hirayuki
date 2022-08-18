require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

module.exports = async (client) => {
    let comma = []
    let slashFiles = fs.readdirSync('./src/slashCommands').filter(file => file.endsWith('.js'))

    for (let file of slashFiles) {
        let command = require(`../slashCommands/${file}`)
        client.commandsSlash.set(command.data.name, command)
        comma.push(command.data.toJSON())
    }

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.ID_BOT), { body: comma });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}