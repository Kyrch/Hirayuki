const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const imgs = require('../../json/characters.json');

const ariCard = async function ariCard(c, lang) {
    let embed = new EmbedBuilder()
        .setColor([255, 255, 255])
        .setImage(imgs[lang].ari)

    let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ari${c.id}`)
                .setLabel('Ari')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        )

    c.send({ embeds: [embed], components: [row] })
    return null
}

const izumiCard = async function izumiCard(c, lang) {
    let embed = new EmbedBuilder()
        .setColor([2, 36, 148])
        .setImage(imgs[lang].izumi)

    let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`izumi${c.id}`)
                .setLabel('Izumi')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        )

    c.send({ embeds: [embed], components: [row] })
    return null
}

const johnCard = async function johnCard(c, lang) {
    let embed = new EmbedBuilder()
        .setColor([251, 231, 6])
        .setImage(imgs[lang].john)

    let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`john${c.id}`)
                .setLabel('John')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        )

    c.send({ embeds: [embed], components: [row] })
    return null
}

const makiCard = async function makiCard(c, lang) {
    let embed = new EmbedBuilder()
        .setColor([148, 2, 2])
        .setImage(imgs[lang].maki)

    let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`maki${c.id}`)
                .setLabel('Maki')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        )

    c.send({ embeds: [embed], components: [row] })
    return null
}

const satoruCard = async function satoruCard(c, lang) {
    let embed = new EmbedBuilder()
        .setColor([5, 157, 23])
        .setImage(imgs[lang].satoru)

    let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`satoru${c.id}`)
                .setLabel('Satoru')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        )

    c.send({ embeds: [embed], components: [row] })
    return null
}

const yuiCard = async function yuiCard(c, lang) {
    let embed = new EmbedBuilder()
        .setColor([111, 52, 4])
        .setImage(imgs[lang].yui)

    let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`yui${c.id}`)
                .setLabel('Yui')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        )

    c.send({ embeds: [embed], components: [row] })
    return null
}

module.exports = {
    ariCard,
    izumiCard,
    johnCard,
    makiCard,
    satoruCard,
    yuiCard
}