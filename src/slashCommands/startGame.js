const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { ariCard, izumiCard, johnCard, makiCard, satoruCard, yuiCard } = require('../functions/createCards');
const { embedReady } = require('../functions/embedReady');
const { Emitter } = require('../game/Emitter');
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
        const listPlayers = new Set();
        const listCharacters = new Set();

        const { user, options, guild, guildId } = interaction
        const lang = options.get('linguagem').value

        guild.channels.create({ name: 'hirayuki', topic: `${trans[lang].createChannel} ${user.username}#${user.discriminator}. ID: ${user.id}` }).then(async c => {
            await interaction.reply({ content: `${trans[lang].createRoom} **<#${c.id}>**` })

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
                        .setPlaceholder(trans[lang].selectCharacter)
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
                Emitter.emit('character-selecioned', { player: i.user.id, character: name, lang: lang, guildId: guildId })

                await i.followUp({ content: `**${name}:** <@!${i.user.id}>` })

                if (players.length == 6) collector.stop();
                NEWINTER = i
            })

            collector.on('end', async () => {
                if (!NEWINTER) return
                try { await embedReady(NEWINTER, players, characterSelecioned, lang, guildId, c) } catch (err) { }
            })
        })
    }
}
