const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { shufflePlaces, shuffleCharacterDeath, selectPlayer } = require('../../functions/gameFunctions');
const { historyChat, systemChat } = require('../../functions/messagesGame');
const { sleep, getEmojiCode } = require('../../functions/rest');
const { Emitter } = require('../Emitter');
const trans = require('../../utils/text.json');

module.exports = async (object) => {
    const { players, characters, lang, channel } = object
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
    }

    systemChat(textInvestigate, channel)
    await sleep(10000)
    let death1 = shuffleCharacterDeath(characters, players)
    console.log(death1)

    let row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('death1').setEmoji(getEmojiCode("☠️")).setStyle(ButtonStyle.Danger))
    systemChat(`**${death1[0]}** (<@!${death1[1]}>) ${trans[lang].systemChat.death}`, channel, row)

    selectPlayerAssassin = selectPlayer(players, death1[1])
    playerAssassin = selectPlayerAssassin[0]
    characterAssassin = characters[selectPlayerAssassin[1]]
    
    console.log(playerAssassin, characterAssassin)

    let filter = m => players.includes(m.user.id)
    let collector = channel.createMessageComponentCollector({ filter, max: 5 })
    collector.on('collect', async i => {
        if (i.user.id == playerAssassin) {
            await i.reply({ content: "Você é o assassino.", ephemeral: true })
        } else {
            await i.reply({ content: "Você NÃO é o assassino.", ephemeral: true })
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
        characterAssassin: characterAssassin,
        playerAssassin: playerAssassin
    }
   // Emitter.emit('death', adeath)

    collector.on('end', () => require('./deathInvestigate')(info))
}