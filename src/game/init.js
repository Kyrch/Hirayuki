const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { shuffleCharacters } = require("../functions/gameFunctions");
const { historyChat, systemChat } = require("../functions/messagesGame");
const trans = require('../utils/text.json')

module.exports = async (object) => {
    const { players, characters, lang, guildId, channel } = object

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
      //  if (i.user.id.includes(a)) return
        a.push(i.user.id)
        await i.followUp({ content: 'clicado'})
    })
    collector.on('end', () => nextStage())
    
    async function nextStage() {
        historyChat(trans[lang].historys.a3, channel)
        await sleep(2000)
        historyChat(trans[lang].historys.contentCard, channel)
        await sleep(20000)
    }
}

sleep = async msec => {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function getEmojiCode(emoji) {
    return String.fromCodePoint("0x" + emoji.codePointAt(0).toString(16))
}