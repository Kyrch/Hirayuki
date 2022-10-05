const shuffleCharacters = (characters) => {
    return characters.sort(() => Math.random() - 0.5)
}

const shufflePlaces = (lang) => {
    let places = require('../utils/text.json')[lang].locals.slice()
    return places.sort(() => Math.random() - 0.5)
}

const numberRandom = (excludeNumber) => {
    let exclude = excludeNumber || -1
    let ranNum = Math.floor(Math.random() * 5)
    
    if (ranNum === exclude) {
        ranNum = numberRandom(exclude);
    }

    return ranNum;
}

module.exports = {
    shuffleCharacters,
    shufflePlaces,
    numberRandom
}