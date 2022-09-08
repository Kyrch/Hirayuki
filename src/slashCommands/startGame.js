const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { ariCard, izumiCard, johnCard, makiCard, satoruCard, yuiCard } = require('../functions/createCards');
const { addDoc } = require('firebase/firestore/lite')
const { gamesId_Db } = require('../../firedb');
const { embedReady } = require('../functions/embedReady');
const trans = require('../utils/text.json');

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
        const { user, options, guild } = interaction
        const lang = options.get('linguagem').value

        guild.channels.create({ name: `hirayuki`, topic: `${trans[lang].createChannel} ${user.username}#${user.discriminator}. ID: ${user.id}` }).then(async c => {
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

                let selectCharacters = new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId('characters')
                            .setOptions([
                                {
                                    label: "Ari",
                                    description: `🎧 Ultimate ${trans[lang].ultimates.ari}`,
                                    value: "Ari"
                                },
                                {
                                    label: "Izumi",
                                    description: `🍀 Ultimate ${trans[lang].ultimates.izumi}`,
                                    value: "Izumi"
                                },
                                {
                                    label: "John",
                                    description: `💡 Ultimate ${trans[lang].ultimates.john}`,
                                    value: "John"
                                },
                                {
                                    label: "Maki",
                                    description: `⚔️ Ultimate ${trans[lang].ultimates.maki}`,
                                    value: "Maki"
                                },
                                {
                                    label: "Satoru",
                                    description: `🔍 Ultimate ${trans[lang].ultimates.satoru}`,
                                    value: "Satoru"
                                },
                                {
                                    label: "Yui",
                                    description: `🎮 Ultimate ${trans[lang].ultimates.yui}`,
                                    value: "Yui"
                                }
                            ])
                    )

                c.send({ content: trans[lang].selectCharacter, components: [selectCharacters] });

                let players = []
                let characterSelecioned = []
                const collector = c.createMessageComponentCollector()

                collector.on('collect', async i => {
                    try { await i.deferUpdate() } catch (err) { }

                    /*if (players.includes(i.user.id)) {
                        await i.followUp({ content: `${trans[lang].alreadySelectPlayer}.`, ephemeral: true })
                        return
                    }*/
                    let name = String(i.values[0])

                    if (characterSelecioned.includes(name)) {
                        await i.followUp({ content: `**${name}** ${trans[lang].alreadySelectCharacter}.`, ephemeral: true })
                        return
                    }

                    players.push(i.user.id)
                    characterSelecioned.push(name)

                    await i.followUp({ content: `**${name}:** <@!${i.user.id}>` })

                    if (players.length == 6) collector.stop();
                    NEWINTER = i
                })

                collector.on('end', () => {
                    embedReady(NEWINTER, players, characterSelecioned, lang)
                })
            })

            // await addDoc(await gamesId_Db(), {
            //     id: c.id,
            //     lang: lang
            // })

        })
    }
}