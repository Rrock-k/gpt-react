import {} from 'openai'
import { ChatCompletionMessage } from 'openai/resources'

export type WrappedMessage = {
  hidden: boolean
  message: ChatCompletionMessage
}
