const shuffleCharacters = (characters) => {
    return characters.sort(() => Math.random() - 0.5)
}

module.exports = {
    shuffleCharacters
}