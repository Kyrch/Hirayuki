const { EmbedBuilder } = require('discord.js');

const systemChat = (description, channel, row) => {
    let embed = new EmbedBuilder()
        .setColor([15, 242, 15])
        .setDescription(description)

    row == undefined ? channel.send({ embeds: [embed] }) : channel.send({ embeds: [embed], components: [row] })
}

const historyChat = (description, channel) => {
    let embed = new EmbedBuilder()
        .setColor([94, 57, 57])
        .setDescription(description)

    channel.send({ embeds: [embed] })
}

module.exports = {
    systemChat,
    historyChat
}