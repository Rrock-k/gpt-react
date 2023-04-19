import { instance } from '@/config/axiosConfig'
import { WrappedMessage } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { ChatCompletionResponseMessage } from 'openai'

export const useOpenAiQuery = () => {
  return useMutation({
    mutationFn: async (data: WrappedMessage[]) => {
      const unwrapped = data.map((wrapped) => wrapped.message)
      return (await instance.post('/api/openai', unwrapped))
        .data as ChatCompletionResponseMessage[]
    },
  })
}
