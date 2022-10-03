const sleep = async (msec) => {
    return new Promise(resolve => setTimeout(resolve, msec))
}
const getEmojiCode = (emoji) => {
    return String.fromCodePoint("0x" + emoji.codePointAt(0).toString(16))
}

module.exports = {
    sleep,
    getEmojiCode
}