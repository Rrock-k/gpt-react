import { askGpt } from '@/config/openaiConfig'
import { logColored } from '@/dev/logColored'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatCompletion, ChatCompletionMessage } from 'openai/resources'

export type ApiResponseType = {
  messages: ChatCompletionMessage[]
  completion: ChatCompletion
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType | string>) {
  try {
    const messages = req.body

    logColored('process.env.NEXT_PUBLIC_OPENAI_API_KEY', process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    logColored('messages', messages)

    const result = await askGpt(messages)
    res.status(200).json(result)
  } catch (error) {
    logColored('error', error)
    res.status(500).json('Sorry, some error occurred.')
  }
}
