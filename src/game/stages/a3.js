const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { systemChat, historyChat } = require("../../functions/messagesGame");
const { sleep, getEmojiCode } = require("../../functions/rest");
const { Emitter } = require("../Emitter");
const trans = require('../../utils/text.json');

module.exports = async (object) => {
    const { players, channel, lang } = object

    systemChat(trans[lang].systemChat.execution, channel)
    await sleep(3000)
    historyChat(trans[lang].historys.a5, channel)
    await sleep(1500)
    historyChat(trans[lang].historys.a6, channel)
    await sleep(1500)
    systemChat(trans[lang].systemChat.a4, channel)
    await sleep(1500)
    await channel.send({
        files: [{
            attachment: 'imgs/mapa/secret-night.png',
            name: 'secret-night.png'
        }]
    })
    Emitter.emit('new-area', object, 'secret')
    await sleep(2000)
    let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('select-chave')
            .setEmoji(getEmojiCode('🔑'))
            .setLabel(trans[lang].objects[0])
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('select-pergaminho')
            .setEmoji(getEmojiCode('📜'))
            .setLabel(trans[lang].objects[1])
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('select-notebook')
            .setEmoji(getEmojiCode('💻'))
            .setLabel(trans[lang].objects[2])
            .setStyle(ButtonStyle.Secondary))

    systemChat(trans[lang].systemChat.a5, channel, row)

    let filter = m => players.includes(m.user.id)
    let collector = channel.createMessageComponentCollector({ filter })
    collector.on('collect', async i => {
        console.log(i.customId)
        try { await i.deferUpdate() } catch (err) {}
        if (i.customId == 'select-pergaminho') {
            await i.followUp({ content: trans[lang].correctAnswer })
            collector.stop()
        } else {
            await i.followUp({ content: trans[lang].wrongAnswer })
        }
    })

    collector.on('end', async () => {
        historyChat(trans[lang].historys.contentScroll, channel)
        await sleep(10000)
        require('./a4')(object)
    })
}