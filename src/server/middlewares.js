const path = require('path')
const db = require(`${path.dirname(__filename)}/db.json`)
const { getTime } = require('date-fns')

// datefns generator
// _.subMinutes(new Date(), 1).getTime()

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
  } else if (req.method === 'POST') {
    req.body.timestamp = getTime(Date.now())
    next()
  } else {
    next()
  }
}
