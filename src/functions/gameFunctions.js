const shuffleCharacters = (characters) => {
    let copy = characters.slice()
    return copy.sort(() => Math.random() - 0.5)
}

const shufflePlaces = (lang) => {
    let places = require('../utils/text.json')[lang].locals.slice()
    return places.sort(() => Math.random() - 0.5)
}

const numberRandom = (excludeNumber, max) => {
    let exclude = excludeNumber || -1
    let ranNum = Math.floor(Math.random() * max)
    
    if (ranNum === exclude) {
        ranNum = numberRandom(exclude, max);
    }

    return ranNum;
}

module.exports = {
    shuffleCharacters,
    shufflePlaces,
    numberRandom
}