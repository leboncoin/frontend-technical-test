import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { SERVER_URL } from '@/utils/constants'

const schema = z.object({
  conversationId: z.number(),
  authorId: z.number(),
  body: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body

    const parsed = schema.safeParse(data)

    if (!parsed.success) {
      return res.status(400).json({
        error: { message: 'Invalid request body' },
      })
    }

    const newMessage = {
      ...data,
      timestamp: new Date().getTime(),
    }

    const response = await fetch(
      `${SERVER_URL}/messages/${data.conversationId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      }
    )

    res.status(201).json(await response.json())
  } else {
    res.status(405).send({ error: 'failed to fetch data' })
  }
}
