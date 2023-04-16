import {
  ChatCompletionResponseMessage,
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi,
} from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
export const openai = new OpenAIApi(configuration)

const defaultConfig: Omit<CreateChatCompletionRequest, 'messages'> = {
  model: 'gpt-3.5-turbo-0301',
  temperature: 0.6,
  max_tokens: 700,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
}

export const askGpt = async (
  messages: ChatCompletionResponseMessage[],
  config: Omit<CreateChatCompletionRequest, 'messages'> = defaultConfig
) => {
  const result = await openai.createChatCompletion({
    ...defaultConfig,
    ...config,
    messages,
  })

  const { message } = result.data.choices[0]

  if (message) messages.push(message)
  return messages
}
