const { Emitter } = require("./Emitter");

module.exports = () => {
    Emitter.on('character-selecioned', (object) => {});
    Emitter.on('game-start', (object) => require('./stages/a1')(object));
    Emitter.on('death', (death) => console.log(death));
    Emitter.on('correct-assassin', (info) => console.log(info))
    Emitter.on('game-fail', (info) => console.log(info))
}

/*
character-selecioned
game-start
stage-a1
*/