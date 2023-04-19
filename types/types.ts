import { ChatCompletionRequestMessage } from 'openai'

export type WrappedMessage = {
  hidden: boolean
  message: ChatCompletionRequestMessage
}
