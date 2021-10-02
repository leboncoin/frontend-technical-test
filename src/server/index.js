const path = require('path')
const db = require(`${path.dirname(__filename)}/db.json`)
const R = require('ramda')
const { subMinutes, addMinutes } = require('date-fns')

// 1,2,3 or 4
function randomMinutes() {
  return Math.floor(Math.random() * 3) + 1
}

module.exports = () => {
  const conversations = R.groupWith(
    (messageA, messageB) =>
      messageA.conversationId === messageB.conversationId,
    db.messages,
  )
  let oldestMessage = subMinutes(new Date(), 57)
  R.forEach((conversation) => {
    conversation = R.map((message) => {
      message.timestamp = oldestMessage.getTime()
      oldestMessage = addMinutes(
        oldestMessage,
        randomMinutes(), // 1 to 4 minutes between messages
      )
    }, conversation)
    oldestMessage = addMinutes(oldestMessage, 10) // 10 min offset between conversations
  }, conversations)
  db.messages = R.flatten(conversations)
  return db
}
