const { systemChat, historyChat } = require("../../functions/messagesGame");
const { sleep } = require("../../functions/rest");
const trans = require('../../utils/text.json');

module.exports = async (object) => {
    const { players, characters, channel, lang } = object

    systemChat(trans[lang].systemChat.execution, channel)
    await sleep(3000)
    historyChat(trans[lang].historys.a5)

}