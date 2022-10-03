const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { systemChat } = require("../../functions/messagesGame");
const { sleep, getEmojiCode } = require("../../functions/rest");
const trans = require('../../utils/text.json');
const { Emitter } = require("../Emitter");

var buttonAri = new ButtonBuilder().setCustomId('button-ari').setLabel('Ari').setEmoji(getEmojiCode("🎧")).setStyle(ButtonStyle.Secondary)
var buttonIzumi = new ButtonBuilder().setCustomId('button-izumi').setLabel('Izumi').setEmoji(getEmojiCode("🍀")).setStyle(ButtonStyle.Secondary)
var buttonJohn = new ButtonBuilder().setCustomId('button-john').setLabel('John').setEmoji(getEmojiCode("💡")).setStyle(ButtonStyle.Secondary)
var buttonMaki = new ButtonBuilder().setCustomId('button-maki').setLabel('Maki').setEmoji(getEmojiCode("⚔️")).setStyle(ButtonStyle.Secondary)
var buttonSatoru = new ButtonBuilder().setCustomId('button-satoru').setLabel('Satoru').setEmoji(getEmojiCode("🔍")).setStyle(ButtonStyle.Secondary)
var buttonYui = new ButtonBuilder().setCustomId('button-yui').setLabel('Yui').setEmoji(getEmojiCode("🎮")).setStyle(ButtonStyle.Secondary)
let deaths = []

module.exports = async (object) => {
    const { death, nameNumberFile, players, characters, lang, channel, characterDeath, playerDeath, characterAssassin, playerAssassin } = object
    deaths.push(characterDeath)

    systemChat(trans[lang].systemChat.assassin, channel)
    await sleep(2000)
    systemChat(trans[lang].systemChat.localDeath1, channel)
    systemChat(trans[lang].systemChat.weaponDeath1, channel)
    await sleep(2000)

    let row1 = new ActionRowBuilder().addComponents(buttonAri.setDisabled(deaths.includes('Ari')), buttonIzumi.setDisabled(deaths.includes('Izumi')), buttonJohn.setDisabled(deaths.includes('John')))
    let row2 = new ActionRowBuilder().addComponents(buttonMaki.setDisabled(deaths.includes('Maki')), buttonSatoru.setDisabled(deaths.includes('Satoru')), buttonYui.setDisabled(deaths.includes('Yui')))
    systemChat(trans[lang].systemChat.discuss, channel, row1, row2)

  //  let filter = m => players.includes(m.user.id) && m.user.id != playerDeath
    let collector = channel.createMessageComponentCollector({ max: 6 - death })
    let choices = 0

    collector.on('collect', async i => {
        try { await i.deferUpdate() } catch (err) { }
        if (i.customId.split('-')[1] == characterAssassin.toLowerCase()) choices++
        await i.followUp({ content: "OK", ephemeral: true })
    })

    collector.on('end', () => {
        if (choices > (6 - death) / 2) {
            channel.send({ content: trans[lang].systemChat.correctAnswer })
            Emitter.emit('correct-assassin', (object))

            let info = {
                deaths: deaths,
                players: players.filter(a => a != playerAssassin && a != playerDeath),
                characters: characters.filter(a => a != characterAssassin  && a != characterDeath),
                channel: channel,
                lang: lang
            }

            require(`./a${nameNumberFile + 1}`)(info)
        } else {
            channel.send({ content: trans[lang].systemChat.wrongAnswer })
            Emitter.emit('game-fail', object)
        }
    })
}