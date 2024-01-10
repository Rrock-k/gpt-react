import OpenAI from 'openai'
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from 'openai/resources'

export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const DEFAULT_MODEL = 'gpt-4-0613'

const defaultConfig: Omit<ChatCompletionCreateParamsNonStreaming, 'messages'> = {
  model: DEFAULT_MODEL,
  // temperature: 0.6,
  // max_tokens: 700,
  // top_p: 1,
  // frequency_penalty: 0,
  // presence_penalty: 0,
  stream: false,
}

export type AskGptConfig = Partial<Omit<ChatCompletionCreateParamsNonStreaming, 'messages'>>

export const askGpt = async (
  messages: ChatCompletionMessageParam[],
  config: Partial<Omit<ChatCompletionCreateParamsNonStreaming, 'messages'>> = {}
) => {
  if (config.stream) throw new Error('Stream is not supported here.')

  console.log('defaultConfig', defaultConfig)

  const completion = await openai.chat.completions.create({
    messages,
    ...defaultConfig,
    ...config,
  })

  const list = await openai.models.list().then((res) => {
    console.log('list:', res)
    return res
  })

  console.log('result', completion)

  const { message } = completion.choices[0]

  if (message) messages.push(message)
  return { messages, completion, list }
}
