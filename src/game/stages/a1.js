const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { shuffleCharacters } = require("../../functions/gameFunctions");
const { historyChat, systemChat } = require("../../functions/messagesGame");
const { sleep, getEmojiCode } = require('../../functions/rest');
const { Emitter } = require('../Emitter');
const trans = require('../../utils/text.json');

module.exports = async (object) => {
    const { players, characters, lang, channel } = object
    Emitter.emit('stage-a1', object)

    historyChat(trans[lang].historys.a1, channel)
    await sleep(5000)
    historyChat(trans[lang].historys.a2, channel)
    await sleep(5000)
    systemChat(trans[lang].systemChat.a1, channel)
    await sleep(500)
    let shuffle = shuffleCharacters(characters)
    systemChat(`${shuffle[0]} <=> ${shuffle[1]}\n${shuffle[2]} <=> ${shuffle[3]}\n${shuffle[4]} <=> ${shuffle[5]}`, channel)

    let row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('talk').setEmoji(getEmojiCode("✅")).setStyle(ButtonStyle.Secondary))
    systemChat(trans[lang].systemChat.a2, channel, row)
    let filter = m => players.includes(m.user.id)
    let collector = channel.createMessageComponentCollector({ filter, max: 6 })

    let a = []
    collector.on('collect', async i => {
        try { await i.deferUpdate() } catch (err) { }
      //  if (a.includes(i.user.id)) return
        a.push(i.user.id)
        await i.followUp({ content: 'clicado'})
    })
    collector.on('end', () => require('./a2')(object))
}