const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Emitter } = require('../game/Emitter');
const trans = require('../utils/text.json');

const embedReady = async (interaction, players, characters, lang, guildId, channel) => {

    let string = ""
    for (let k = 0; k < players.length; k++) {
        string += `**${characters[k]}:** <@!${players[k]}>\n`
    }

    let embed = new EmbedBuilder()
        .setColor([0, 255, 0])
        .setDescription(string)

    let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('ready')
                .setLabel(trans[lang].readyGame)
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel(trans[lang].cancelGame)
                .setStyle(ButtonStyle.Danger)
        )

    await interaction.followUp({ embeds: [embed], components: [row] })
    const collector = interaction.channel.createMessageComponentCollector({ max: 1 })
    collector.on('collect', async i => {
        try { await i.deferUpdate() } catch (err) { }
        
        if (i.customId == 'ready') {
            await i.followUp({
                content: trans[lang].gameStarted,
                files: [{
                    attachment: 'imgs/mapa/default-day.png',
                    name: 'default-day.png'
                }]
            })
            Emitter.emit('game-start', { players: players, characters: characters, lang: lang, guildId: guildId, channel: channel })
        } else if (i.customId == 'cancel') {
            await i.followUp(trans[lang].gameCanceled)
        }
    })
}

module.exports = {
    embedReady
}