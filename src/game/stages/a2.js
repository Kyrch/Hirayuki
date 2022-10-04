const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { shufflePlaces, numberRandom } = require('../../functions/gameFunctions');
const { historyChat, systemChat } = require('../../functions/messagesGame');
const { sleep, getEmojiCode } = require('../../functions/rest');
const { Emitter } = require('../Emitter');
const trans = require('../../utils/text.json');

module.exports = async (object) => {
    const { players, characters, lang, channel } = object
    console.log(characters, 'a2')
    Emitter.emit('stage-a2', object)
    historyChat(trans[lang].historys.a3, channel)
    await sleep(2000)
    historyChat(trans[lang].historys.contentCard, channel)
    await sleep(20000)
    historyChat(trans[lang].historys.a4, channel)
    await sleep(5000)
    systemChat(trans[lang].systemChat.a3, channel)

    shufflePlacesInvestigate1 = shufflePlaces(lang)

    let textInvestigate = ""
    for (let i = 0; i < 6; i++) {
        textInvestigate += `\n${characters[i]} => ${shufflePlacesInvestigate1[i]}`
        if (shufflePlacesInvestigate1[i] == trans[lang].locals[2]) {
            var assassinNumber = i
        }
    }

    systemChat(textInvestigate, channel)
    await sleep(10000)
    let randomDeath = numberRandom(assassinNumber)
    let death1 = [characters[randomDeath], players[randomDeath]]
    console.log(death1, 'morte')

    let row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('death1').setEmoji(getEmojiCode("☠️")).setStyle(ButtonStyle.Danger))
    systemChat(`**${death1[0]}** (<@!${death1[1]}>) ${trans[lang].systemChat.death}`, channel, row)

    let assassin1 = [characters[assassinNumber], players[assassinNumber]]  
    console.log(assassin1, 'assassino')

    let filter = m => players.includes(m.user.id)
    let collector = channel.createMessageComponentCollector({ filter, max: 5 })
    collector.on('collect', async i => {
        if (i.user.id == assassin1[1]) {
            await i.reply({ content: trans[lang].systemChat.isAssassin, ephemeral: true })
        } else {
            await i.reply({ content: trans[lang].systemChat.notAssassin, ephemeral: true })
        }
    })

    let info = {
        death: 1,
        nameNumberFile: 2,
        players: players,
        characters: characters,
        lang: lang,
        channel: channel,
        characterDeath: death1[0],
        playerDeath: death1[1],
        characterAssassin: assassin1[0],
        playerAssassin: assassin1[1]
    }
   // Emitter.emit('death', adeath)

    collector.on('end', () => require('./deathInvestigate')(info))
}