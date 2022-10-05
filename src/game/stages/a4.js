const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { numberRandom } = require("../../functions/gameFunctions");
const { historyChat, systemChat } = require("../../functions/messagesGame");
const { sleep, getEmojiCode } = require("../../functions/rest");
const { Emitter } = require('../Emitter');
const trans = require('../../utils/text.json');

module.exports = async (object) => {
    const { players, characters, lang, channel } = object

    historyChat(trans[lang].historys.a7, channel)
    let randomDeath = numberRandom(-1, 4)

    let death2 = [characters[randomDeath], players[randomDeath]]
    let assassin2 = death2.slice()
    let randomDisappear = numberRandom(randomDeath, 4)
    let disappear = [characters[randomDisappear], players[randomDisappear]]
    await sleep(3000)

    systemChat(`${death2[0]}, ${disappear[0]} ${trans[lang].systemChat.disappears}`, channel)
    await sleep(1500)
    historyChat(trans[lang].historys.a8, channel)
    await sleep(4000)
    historyChat(trans[lang].historys.a9, channel)
    await sleep(7000)
    let row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('death2').setEmoji(getEmojiCode("☠️")).setStyle(ButtonStyle.Danger))
    systemChat(`**${death2[0]}** (<@!${death2[1]}>) ${trans[lang].systemChat.death}`, channel, row)
    Emitter.emit('death', death2, assassin2)

    let filter = m => players.includes(m.user.id)
    let collector = channel.createMessageComponentCollector({ filter, max: 3 })
    collector.on('collect', async i => {
        try { await i.deferUpdate() } catch (err) {}
        if (i.user.id == assassin2[1]) {
            await i.followUp({ content: trans[lang].systemChat.isAssassin, ephemeral: true })
        } else {
            await i.followUp({ content: trans[lang].systemChat.notAssassin, ephemeral: true })
        }
    })

    let info = {
        death: 3,
        currentNumFile: 4,
        players: players,
        characters: characters,
        lang: lang,
        channel: channel,
        characterDeath: death2[0],
        playerDeath: death2[1],
        characterAssassin: assassin2[0],
        playerAssassin: assassin2[1],
        localDeath: trans[lang].systemChat.localDeath2,
        weaponDeath: trans[lang].systemChat.weaponDeath2
    }

    collector.on('end', () => require('./deathInvestigate')(info))
}