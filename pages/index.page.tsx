import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useForm } from '@mantine/form'
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Overlay,
  Stack,
  Text,
  Textarea,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useOpenAiQuery } from '@/react-query/useOpenAiQuery'
import { KeyboardEventHandler, useRef, useState } from 'react'
import { Message } from './components/message'
import { codeSnippetsFormattingInstructionMessage } from '@/instructions/instructions'
import { WrappedMessage } from '@/types'
import { type ChatCompletionMessage } from 'openai/resources'

const wrapInWrappedMessage = (message: ChatCompletionMessage, hidden = false) => ({
  message: message,
  hidden,
})

export default function Home() {
  const { toggleColorScheme } = useMantineColorScheme()

  const { mutateAsync: sendMessages, data } = useOpenAiQuery()

  console.log('data', data)

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
    const { messages: responseMessages } = await sendMessages(wrappedMessages)
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

  const theme = useMantineTheme()

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

          <ActionIcon
            size={'lg'}
            pos="fixed"
            right={30}
            top={30}
            onClick={() => toggleColorScheme()}
            c="dark.3"
            //
            radius="md"
            sx={{
              border: '2px solid currentColor',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.375rem"
              height="1.375rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
            </svg>
          </ActionIcon>

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
                  theme.colorScheme === 'dark' ? theme.colors.cyan[9] : theme.colors.cyan[1],
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
                  color={theme.colorScheme === 'dark' ? 'success' : 'dark.4'}
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
