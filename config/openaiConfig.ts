import {
  ChatCompletionResponseMessage,
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi,
} from 'openai'

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
export const openai = new OpenAIApi(configuration)

const defaultConfig: Omit<CreateChatCompletionRequest, 'messages'> = {
  model: 'gpt-4',
  temperature: 0.6,
  max_tokens: 700,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stream: false,
}

export type AskGptConfig = Partial<
  Omit<CreateChatCompletionRequest, 'messages'>
>

export const askGpt = async (
  messages: ChatCompletionResponseMessage[],
  config: Partial<Omit<CreateChatCompletionRequest, 'messages'>> = defaultConfig
) => {
  if (config.stream) throw new Error('Stream is not supported here.')

  const result = await openai.createChatCompletion({
    ...defaultConfig,
    ...config,
    messages,
  })

  const { message } = result.data.choices[0]

  if (message) messages.push(message)
  return messages
}
