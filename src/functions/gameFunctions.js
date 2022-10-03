const shuffleCharacters = (characters) => {
    return characters.sort(() => Math.random() - 0.5)
}

const shufflePlaces = (lang) => {
    return require('../utils/text.json')[lang].locals.sort(() => Math.random() - 0.5)
}

const shuffleCharacterDeath = (characters, players) => {
    let randomNumberArray = Math.floor(Math.random() * characters.length)
    let characterDeath = characters[randomNumberArray]
    let index = characters.indexOf(characterDeath)
    let playerDeath = players[index]
    return [characterDeath, playerDeath]
}

const selectPlayer = (players, death) => {
    let randomNumberArray = Math.floor(Math.random() * players.length)
    if (players[randomNumberArray] != death) {
        return [players[randomNumberArray], randomNumberArray]
    } else {
        if (randomNumberArray == 5) {
            randomNumberArray--
            return [players[randomNumberArray], randomNumberArray]
        } else if (randomNumberArray < 5) {
            randomNumberArray++
            return [players[randomNumberArray], randomNumberArray]
        }
    }
}

module.exports = {
    shuffleCharacters,
    shufflePlaces,
    shuffleCharacterDeath,
    selectPlayer
}