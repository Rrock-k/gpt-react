import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useForm } from '@mantine/form'
import { Box, Button, Container, Overlay, Stack, Text, Textarea } from '@mantine/core'
import { useOpenAiQuery } from '@/react-query/useOpenAiQuery'
import { ChatCompletionResponseMessage } from 'openai'
import { KeyboardEventHandler, useRef, useState } from 'react'
import { Message } from './components/message'
import { codeSnippetsFormattingInstructionMessage } from '@/instructions/instructions'
import { WrappedMessage } from '@/types'

const wrapInWrappedMessage = (message: ChatCompletionResponseMessage, hidden = false) => ({
  message: message,
  hidden,
})

export default function Home() {
  const { mutateAsync: sendMessages } = useOpenAiQuery()

  const [wrappedMessages, setWrappedMessages] = useState<WrappedMessage[]>([codeSnippetsFormattingInstructionMessage])

  const form = useForm({
    initialValues: {
      prompt: '',
    },
  })

  const handleButtonClick = async () => {
    if (form.values.prompt.trim().length === 0) return

    const wrappedMessage = wrapInWrappedMessage({
      content: form.values.prompt,
      role: 'user',
    })
    form.setFieldValue('prompt', '')

    wrappedMessages.push(wrappedMessage)
    const responseMessages = await sendMessages(wrappedMessages)
    const newMessage = responseMessages[responseMessages.length - 1]
    setWrappedMessages((old) => (newMessage != null ? [...old, wrapInWrappedMessage(newMessage)] : old))
  }

  const handleClear = () => {
    setWrappedMessages([])
  }

  const mantineButtonRef = useRef<HTMLButtonElement>(null)

  const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      mantineButtonRef.current?.click()
    }
  }

  return (
    <>
      <Head>
        <title>goodbadgood.dev</title>
        <meta name="description" content="Kirill Zhaborovskii's personal page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Box component="form" onSubmit={form.onSubmit(handleButtonClick)} w="100%">
          <Container size="md" pb="110px">
            <Stack spacing={4}>
              {wrappedMessages
                .map((wrappedMessage, index) => {
                  if (wrappedMessage.hidden) return null
                  return <Message wrappedMessage={wrappedMessage} key={index} />
                })
                .filter(Boolean)}
            </Stack>
          </Container>

          <Box
            //
            px="2rem"
            pt="sm"
            //
            pos="fixed"
            bottom={0}
            left={0}
            right={0}
            //
          >
            <Overlay
              sx={(theme) => ({
                background: `linear-gradient(0deg, ${theme.fn.darken(
                  theme.colors.cyan[9],
                  0.5
                )} 0%, rgba(255, 255, 255, 0) 100%)`,
              })}
              zIndex={-1}
            />

            <Container>
              <Stack spacing={4} py="lg">
                <Textarea
                  //
                  label="Prompt"
                  styles={{
                    input: {
                      fontSize: '.9rem',
                    },
                  }}
                  {...form.getInputProps('prompt')}
                  placeholder="Send a message..."
                  onKeyDown={handleKeyPress}
                />

                <Button
                  //
                  ref={mantineButtonRef}
                  type="submit"
                  color="success"
                >
                  Send message
                </Button>

                <Text
                  onClick={handleClear}
                  c="gray20"
                  component="a"
                  align="center"
                  size="sm"
                  fw="bold"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Clear conversation
                </Text>
              </Stack>
            </Container>
          </Box>
        </Box>
      </main>
    </>
  )
}
