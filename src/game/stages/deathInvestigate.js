const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { systemChat } = require("../../functions/messagesGame");
const { sleep, getEmojiCode } = require("../../functions/rest");
const { Emitter } = require("../Emitter");
const trans = require('../../utils/text.json');

var buttonAri = new ButtonBuilder().setCustomId('button-ari').setLabel('Ari').setEmoji(getEmojiCode("🎧")).setStyle(ButtonStyle.Secondary)
var buttonIzumi = new ButtonBuilder().setCustomId('button-izumi').setLabel('Izumi').setEmoji(getEmojiCode("🍀")).setStyle(ButtonStyle.Secondary)
var buttonJohn = new ButtonBuilder().setCustomId('button-john').setLabel('John').setEmoji(getEmojiCode("💡")).setStyle(ButtonStyle.Secondary)
var buttonMaki = new ButtonBuilder().setCustomId('button-maki').setLabel('Maki').setEmoji(getEmojiCode("⚔️")).setStyle(ButtonStyle.Secondary)
var buttonSatoru = new ButtonBuilder().setCustomId('button-satoru').setLabel('Satoru').setEmoji(getEmojiCode("🔍")).setStyle(ButtonStyle.Secondary)
var buttonYui = new ButtonBuilder().setCustomId('button-yui').setLabel('Yui').setEmoji(getEmojiCode("🎮")).setStyle(ButtonStyle.Secondary)
let deathsCharacters = []
let deathsPlayers = []
let assassinsCharacters = []
let assassinsPlayers = []

module.exports = async (object) => {
    const { death, currentNumFile, players, characters, lang, channel, characterDeath, playerDeath, characterAssassin, playerAssassin } = object
    console.log(characters, 'deathInvestigate')
    deathsCharacters.push(characterDeath)
    deathsPlayers.push(deathsPlayers)
    assassinsCharacters.push(characterAssassin)
    assassinsPlayers.push(playerAssassin)

    systemChat(trans[lang].systemChat.assassin, channel)
    await sleep(2000)
    systemChat(trans[lang].systemChat.localDeath1, channel)
    systemChat(trans[lang].systemChat.weaponDeath1, channel)
    await sleep(2000)

    let styleButton = (name) => { return name == characterDeath ? ButtonStyle.Danger : ButtonStyle.Secondary }

    let row1 = new ActionRowBuilder().addComponents(buttonAri.setStyle(styleButton('Ari')), buttonIzumi.setStyle(styleButton('Izumi')), buttonJohn.setStyle(styleButton('John')))
    let row2 = new ActionRowBuilder().addComponents(buttonMaki.setStyle(styleButton('Maki')), buttonSatoru.setStyle(styleButton('Satoru')), buttonYui.setStyle(styleButton('Yui')))
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
                deaths: [...deathsCharacters, ...assassinsCharacters],
                players: players.filter(a => !a.includes(playerAssassin) && !a.includes(playerDeath)),
                characters: characters.filter(a => !a.includes(characterAssassin) && !a.includes(characterDeath)),
                channel: channel,
                lang: lang
            }

            require(`./a${currentNumFile + 1}`)(info)
        } else {
            channel.send({ content: trans[lang].systemChat.wrongAnswer })
            Emitter.emit('game-fail', object)
        }
    })
}