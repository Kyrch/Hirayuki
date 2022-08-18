const { ActivityType } = require("discord.js")

const activities = [{
    type: ActivityType.Playing,
    name: 'HIRAYUKI'
}]

module.exports = {
    async createEvent(client) {
        console.log('Bot ready!')
        client.user.setActivity({ type: ActivityType.Playing, name: 'HIRAYUKI' })

        client.user.setPresence({
            afk: false,
            activities: [{ name: activities[0].name, type: ActivityType.Playing }],
            intents: [],
            partials: []
        })
    }
}