const { Emitter } = require("./Emitter");

module.exports = () => {
    Emitter.on('character-selecioned', (object) => {});
    Emitter.on('game-start', (object) => require('./init')(object));
}