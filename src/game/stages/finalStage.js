const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { systemChat } = require('../../functions/messagesGame');
const { sleep, getEmojiCode } = require('../../functions/rest');
const { Emitter } = require('../Emitter');
const trans = require('../../utils/text.json');

var buttonAri = new ButtonBuilder().setCustomId('Ari-mastermind').setLabel('Ari').setEmoji(getEmojiCode("🎧")).setStyle(ButtonStyle.Secondary)
var buttonIzumi = new ButtonBuilder().setCustomId('Izumi-mastermind').setLabel('Izumi').setEmoji(getEmojiCode("🍀")).setStyle(ButtonStyle.Secondary)
var buttonJohn = new ButtonBuilder().setCustomId('John-mastermind').setLabel('John').setEmoji(getEmojiCode("💡")).setStyle(ButtonStyle.Secondary)
var buttonMaki = new ButtonBuilder().setCustomId('Maki-mastermind').setLabel('Maki').setEmoji(getEmojiCode("⚔️")).setStyle(ButtonStyle.Secondary)
var buttonSatoru = new ButtonBuilder().setCustomId('Satoru-mastermind').setLabel('Satoru').setEmoji(getEmojiCode("🔍")).setStyle(ButtonStyle.Secondary)
var buttonYui = new ButtonBuilder().setCustomId('Yui-mastermind').setLabel('Yui').setEmoji(getEmojiCode("🎮")).setStyle(ButtonStyle.Secondary)

module.exports = async (object) => {
    const { players, characters, channel, lang, mastermind } = object
    console.log(mastermind, 'mastermind')

    await sleep(1500)
    let row1 = new ActionRowBuilder().addComponents(buttonAri.setDisabled(!characters.includes('Ari')), buttonIzumi.setDisabled(!characters.includes('Izumi')), buttonJohn.setDisabled(!characters.includes('John')))
    let row2 = new ActionRowBuilder().addComponents(buttonMaki.setDisabled(!characters.includes('Maki')), buttonSatoru.setDisabled(!characters.includes('Satoru')), buttonYui.setDisabled(!characters.includes('Yui')))
    systemChat(trans[lang].systemChat.a7, channel, row1, row2)

    let filter = m => players.includes(m.user.id)
    let collector = channel.createMessageComponentCollector({ filter, max: 3 })
    let choices = 0

    collector.on('collect', async i => {
        try { await i.deferUpdate() } catch (err) { }
        if (i.customId = `${mastermind[0]}-mastermind`) {
            choices++
            await i.followUp({ content: "OK", ephemeral: true })
        } else {
            await i.followUp({ content: "OK", ephemeral: true })
        }
    })

    collector.on('end', async () => {
        if (choices >= 2) {
            channel.send({ content: trans[lang].gameWin })
            Emitter.emit('game-win', object)
        } else {
            channel.send({ content: trans[lang].gameLoser })
            Emitter.emit('game-fail', object)
        }
    })
}