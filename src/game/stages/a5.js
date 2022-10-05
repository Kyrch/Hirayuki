const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { numberRandom } = require("../../functions/gameFunctions");
const { systemChat } = require("../../functions/messagesGame");
const { sleep, getEmojiCode } = require('../../functions/rest');
const { Emitter } = require("../Emitter");
const trans = require('../../utils/text.json');
const charactersInfo = require('../../utils/charactersInfo.json');

module.exports = async (object) => {
    const { players, characters, channel, lang} = object 

    let numberMastermind = numberRandom(-1, 3)
    let mastermind = [characters[numberMastermind], players[numberMastermind]]
    let genre = charactersInfo[mastermind[0]].genre

    systemChat(trans[lang].systemChat.a4, channel)
    await sleep(1000)
    channel.send({
        files: [{
            attachment: `imgs/mapa/full${genre}-day.png`,
            name: `full${genre}-day.png`
        }]
    })
    Emitter.emit('new-area', object, `full${genre}`)
    await sleep(4000)
    let row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('mastermind').setEmoji(getEmojiCode("❔")).setStyle(ButtonStyle.Secondary))
    systemChat(trans[lang].systemChat.a6, channel, row)

    let filter = m => players.includes(m.user.id)
    let collector = channel.createMessageComponentCollector({ filter, max: 3 })

    collector.on('collect', async i => {
        try { await i.deferUpdate() } catch (err) {}
        if (i.user.id == mastermind[1]) {
            await i.followUp({ content: trans[lang].isMastermind, ephemeral: true })
        } else {
            await i.followUp({ content: trans[lang].notMastermind, ephemeral: true })
        }
    })

    collector.on('end', async () => {
        let info = {
            players: players,
            characters: characters,
            channel: channel,
            lang: lang,
            mastermind: mastermind,
            genre: genre
        }
        require('./finalStage')(info)
    })
}