const { SlashCommandBuilder } = require('discord.js');
const { ariCard, izumiCard, johnCard, makiCard, satoruCard, yuiCard } = require('../functions/createCards');
const { addDoc } = require('firebase/firestore/lite')
const { gamesId_Db } = require('../../firedb');
const { embedReady } = require('../functions/embedReady');
const trans = require('../../json/text.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startgame')
        .setDescription('Inicia um novo jogo')
        .setDMPermission(false)
        .addStringOption(option => option
            .setName('linguagem')
            .setDescription('Selecione a linguagem do jogo')
            .setRequired(true)
            .addChoices({ name: 'PT-BR', value: 'pt-br' }, { name: 'EN-US', value: 'en-us' })),

    async execute(interaction) {
        const { user, options } = interaction
        const lang = options.get('linguagem').value

        interaction.guild.channels.create({ name: `hirayuki`, topic: `${trans[lang].createChannel} ${user.username}#${user.discriminator}. ID: ${user.id}` }).then(async c => {
            await interaction.reply({ content: `${trans[lang].createRoom} **<#${c.id}>**` })

            c.send({
                files: [{
                    attachment: 'imgs/mapa/default-day.png',
                    name: 'default-day.png'
                }]
            }).then(async () => {

                await ariCard(c, lang)
                await izumiCard(c, lang)
                await johnCard(c, lang)
                await makiCard(c, lang)
                await satoruCard(c, lang)
                await yuiCard(c, lang)

                let cha = {
                    a: "Ari",
                    i: "Izumi",
                    j: "John",
                    m: "Maki",
                    s: "Satoru",
                    y: "Yui"
                }

                let players = []
                let characterSelecioned = []
                const collector = c.createMessageComponentCollector()

                collector.on('collect', async i => {
                    try { await i.deferUpdate() } catch (err) { }

                    //if (players.includes(i.user.id)) return
                    let name = cha[i.customId.substring(0, 1)]

                    if (characterSelecioned.includes(name)) return

                    players.push(i.user.id)
                    characterSelecioned.push(name)

                    await i.followUp({ content: `**${characterSelecioned[characterSelecioned.length - 1]}:** <@!${players[players.length - 1]}>` })

                    // i.member.send({ content: 'selecionado' })

                    if (players.length == 6) collector.stop()

                    NEWINTER = i
                })

                collector.on('end', () => {
                    embedReady(NEWINTER, players, characterSelecioned)
                })
            })

            // await addDoc(await gamesId_Db(), {
            //     id: c.id,
            //     lang: lang
            // })

        })
    }
}