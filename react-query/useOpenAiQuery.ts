import { instance } from '@/config/axiosConfig'
import { useMutation } from '@tanstack/react-query'
import { ChatCompletionRequestMessage } from 'openai'

export const useOpenAiQuery = () => {
  return useMutation({
    mutationFn: async (data: ChatCompletionRequestMessage[]) => {
      return (await instance.post('/api/openai', data)).data
    },
  })
}
