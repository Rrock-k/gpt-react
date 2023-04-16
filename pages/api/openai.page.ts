import { askGpt } from '@/config/openaiConfig'
import { logColored } from '@/dev/logColored'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatCompletionRequestMessage } from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatCompletionRequestMessage[] | string>
) {
  try {
    const messages = req.body

    logColored('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)
    logColored('messages', messages)

    const result = await askGpt(messages)
    res.status(200).json(result)
  } catch (error) {
    logColored('error', error)
    res.status(200).json('Sorry, some error occurred.')
  }
}
