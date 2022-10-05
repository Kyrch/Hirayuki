const { Emitter } = require("./Emitter");

module.exports = () => {
   Emitter.on('character-selecioned', (info) => console.log(info));
   Emitter.on('game-start', (object) => require('../game/stages/a1')(object));
   Emitter.on('death', (death, assassin) => console.log(death, assassin));
   Emitter.on('correct-assassin', (info) => console.log(info))
   Emitter.on('new-area', (info, area) => console.log(info, area))
   Emitter.on('game-fail', (info) => console.log(info))
   Emitter.on('game-win', (info) => console.log(info))
}