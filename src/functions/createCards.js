const { EmbedBuilder } = require('discord.js');
const imgs = require('../utils/cards.json');

const ariCard = async (c, lang) => {
    let embed = new EmbedBuilder()
        .setColor([255, 255, 255])
        .setImage(imgs[lang].ari)

    c.send({ embeds: [embed] })
    return null
}

const izumiCard = async (c, lang) => {
    let embed = new EmbedBuilder()
        .setColor([2, 36, 148])
        .setImage(imgs[lang].izumi)

    c.send({ embeds: [embed] })
    return null
}

const johnCard = async (c, lang) => {
    let embed = new EmbedBuilder()
        .setColor([251, 231, 6])
        .setImage(imgs[lang].john)

    c.send({ embeds: [embed] })
    return null
}

const makiCard = async (c, lang) => {
    let embed = new EmbedBuilder()
        .setColor([148, 2, 2])
        .setImage(imgs[lang].maki)

    c.send({ embeds: [embed] })
    return null
}

const satoruCard = async (c, lang) => {
    let embed = new EmbedBuilder()
        .setColor([5, 157, 23])
        .setImage(imgs[lang].satoru)

    c.send({ embeds: [embed] })
    return null
}

const yuiCard = async (c, lang) => {
    let embed = new EmbedBuilder()
        .setColor([111, 52, 4])
        .setImage(imgs[lang].yui)

    c.send({ embeds: [embed] })
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