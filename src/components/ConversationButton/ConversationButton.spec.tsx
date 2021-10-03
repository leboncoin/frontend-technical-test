import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import React from 'react'
import ConversationButton from './ConversationButton'
import { setupServer } from 'msw/node'
import { DefaultRequestBody, rest } from 'msw'
import { baseUrl } from '../../constants'
import { Message } from '../../types/message'
import { User as Friend } from '../../types/user'
import CustomSWRConfig from '../CustomSWRConfig'

const conversationId = 2
const friendId = 3

const server = setupServer(
  rest.get<
    DefaultRequestBody,
    {
      result: Message
    }
  >(
    `${baseUrl}/message/latest/${conversationId}`,
    (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.json({
          result: {
            id: 123,
            authorId: 8,
            body: 'hello comment vas tu?',
            conversationId: conversationId,
            timestamp: 2345678567,
          },
        }),
      )
    },
  ),
  rest.get<DefaultRequestBody, Friend>(
    `${baseUrl}/users/${friendId}`,
    (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.json({
          avatar: 'foobar.jpg',
          id: friendId,
          nickname: 'Tony Soprano',
          token: 'xxxx',
        }),
      )
    },
  ),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

beforeEach(async () => {
  render(
    <CustomSWRConfig>
      <ConversationButton
        conversationId={conversationId}
        friendId={friendId}
      />
    </CustomSWRConfig>,
  )
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'))
})

xtest('show the proper conversation button with friends infos', () => {
  expect(screen.getByText('Tony Soprano')).toBeInTheDocument()
})
