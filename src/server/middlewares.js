const path = require('path')
const db = require(`${path.dirname(__filename)}/db.json`)

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
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
  } else {
    next()
  }
}
