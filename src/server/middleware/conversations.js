const fs = require('fs');
const path = require('path');
const dbPath = `${path.dirname(__filename)}/../db.json`;

const readDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDb = (db) =>
  fs.writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`);

const getLastMessage = (conversation, messages) => {
  return messages
    .filter((message) => message.conversationId === conversation.id)
    .sort((a, b) => b.timestamp - a.timestamp)[0];
};

const enrichConversation = (conversation, messages) => {
  const lastMessage = getLastMessage(conversation, messages);

  if (!lastMessage) {
    return {
      ...conversation,
      lastMessageBody: conversation.lastMessageBody ?? '',
    };
  }

  return {
    ...conversation,
    lastMessageTimestamp: lastMessage.timestamp,
    lastMessageBody: lastMessage.body,
  };
};

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const db = readDb();
    const conversationId = Number(req.query?.id);
    const userIdFromQuery = Number(req.query?.senderId);
    const userIdFromPath = Number(req.url.match(/\/conversations\/(\d+)/)?.[1]);
    const userId = Number.isInteger(userIdFromQuery)
      ? userIdFromQuery
      : userIdFromPath;

    if (Number.isInteger(conversationId)) {
      res
        .status(200)
        .json(
          db?.conversations
            ?.filter((conv) => conv.id === conversationId)
            .map((conv) => enrichConversation(conv, db.messages ?? []))
        );
      return;
    }

    if (!Number.isInteger(userId)) {
      res
        .status(200)
        .json(
          (db?.conversations ?? []).map((conv) =>
            enrichConversation(conv, db.messages ?? [])
          )
        );
      return;
    }

    const result = db.conversations.filter(
      (conv) => conv.senderId == userId || conv.recipientId == userId
    );

    res
      .status(200)
      .json(result.map((conv) => enrichConversation(conv, db.messages ?? [])));
    return;
  }

  if (/messages/.test(req.url) && req.method === 'POST') {
    const conversationIdFromQuery = Number(req.query?.conversationId);
    const conversationIdFromPath = Number(
      req.url.match(/\/messages\/(\d+)/)?.[1]
    );
    const conversationId = Number.isInteger(conversationIdFromQuery)
      ? conversationIdFromQuery
      : conversationIdFromPath;

    if (Number.isInteger(conversationId)) {
      const db = readDb();
      const messageId =
        Math.max(0, ...(db.messages ?? []).map((message) => message.id)) + 1;
      const message = {
        ...req.body,
        id: messageId,
        conversationId,
      };

      db.messages = [...(db.messages ?? []), message];
      db.conversations = (db.conversations ?? []).map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              lastMessageTimestamp: message.timestamp,
              lastMessageBody: message.body,
            }
          : conversation
      );

      writeDb(db);
      res.status(201).json({ id: messageId });
      return;
    }
  }

  next();
};
