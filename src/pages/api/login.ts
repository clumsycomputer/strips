import { NowRequest, NowResponse } from '@vercel/node'

export default (request: NowRequest, response: NowResponse) => {
  response.statusCode = 200
  response.json({ todo: 'todo' })
}
