const path = require('path')
const db = require(`${path.dirname(__filename)}/db.json`)
const { getTime } = require('date-fns')
const authorId = 1

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (
    /conversations/.test(req.url) &&
    req.method === 'GET' &&
    req.query.senderId
  ) {
    const userId = req.query.senderId
    const result = db.conversations.filter(
      (conv) => conv.senderId == userId || conv.recipientId == userId,
    )
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )

    res.json({ result })
  } else if (
    /message\/latest/.test(req.url) &&
    req.method === 'GET' &&
    req.query.conversationId
  ) {
    const conversationId = req.query.conversationId
    const messagesFilteredByTS = db.messages
      .filter((message) => message.conversationId == conversationId)
      .sort((a, b) => b.timestamp - a.timestamp)

    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )

    res.json({ result: messagesFilteredByTS[0] })
  } else if (/messages/.test(req.url) && req.method === 'POST') {
    req.body.timestamp = getTime(Date.now())
    next()
  } else if (/conversations/.test(req.url) && req.method === 'POST') {
    const value = req.body
    const conversation = db.conversations.find(
      (conversation) =>
        conversation.senderNickname.toLowerCase() ===
          value.nickname.toLowerCase() ||
        conversation.recipientNickname.toLowerCase() ===
          value.nickname.toLowerCase(),
    )
    if (conversation) {
      db.messages.push({
        id: db.messages[db.messages.length - 1].id + 1,
        conversationId: conversation.id,
        timestamp: getTime(Date.now()),
        authorId,
        body: value.body,
      })
      const friendId = db.users.find(
        (user) =>
          user.nickname.toLowerCase() ===
          value.nickname.toLowerCase(),
      ).id
      res.redirect(`/chat/${friendId}/${conversation.id}`)
    }
  } else {
    next()
  }
}
