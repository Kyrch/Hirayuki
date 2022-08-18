const fs = require('fs');

const events = {
    "ready.js": "ready",
    "slashCreate.js": "interactionCreate"
}

module.exports = (client) => {
    const eventFiles = fs.readdirSync(`./src/events`).filter(file => file.endsWith('.js'))

    for (let file of eventFiles) {
        let event = require(`../events/${file}`)
        client.on(events[file], (data) => {
            event.createEvent(data, client)
        })
    }
}