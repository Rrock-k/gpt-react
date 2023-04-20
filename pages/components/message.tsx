import React from 'react'
import { Box, Stack, Text } from '@mantine/core'
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { ChatCompletionResponseMessage } from 'openai'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'
import DefaultSyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/default-highlight'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light-async'
import { WrappedMessage } from '@/types'

const CODE_BLOCK_REGEX = /```[\s\S]*?```/g

export const Message = ({
  wrappedMessage,
}: {
  wrappedMessage: WrappedMessage
}) => {
  const { hidden, message } = wrappedMessage

  if (hidden) return null

  const parts = message.content.split(CODE_BLOCK_REGEX)
  const contentParts = message.content.match(CODE_BLOCK_REGEX) || []

  const resultingParts = parts.flatMap((part, index) => {
    const codeBlock = contentParts[index]

    const splited = part.split('\n\n')

    const result = splited
      .flatMap((part, index) => [
        <MyText key={part}>{part}</MyText>,
        index !== splited.length - 1 ? (
          <Text key={part + '-br'} size="xs">
            <br />
          </Text>
        ) : null,
      ])
      .filter(Boolean)

    return [result, <CodeBlock code={codeBlock} key={codeBlock} />].filter(
      Boolean
    )
  })

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          message.role === 'user' ? theme.colors.gray[7] : theme.colors.gray[9],
        color: theme.colors.gray20,
        padding: '1.2rem',
        border: `1px solid ${theme.black}`,
        borderRadius: theme.radius.md,
      })}
    >
      {resultingParts}
    </Box>
  )
}

const MyText = ({ children }: { children: string }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
)

const BORDER_RADIUS = '.5rem'

const CodeBlock = ({ code }: { code: string }) => {
  if (!code) return null

  const withoutQuotes = code.slice(3, -3).trim()
  const [language, ...rest] = withoutQuotes.split('\n')

  const isSupported =
    DefaultSyntaxHighlighter.supportedLanguages.includes(language)

  const cleanedCode = (isSupported ? rest : [language, ...rest]).join('\n')

  const label = isSupported ? language : null
  //
  return (
    <Stack spacing={'0px'} my="1rem">
      {label ? (
        <Text
          size="xs"
          color="gray25"
          bg="dark"
          p="3px"
          px="xs"
          sx={{
            borderTopLeftRadius: BORDER_RADIUS,
            borderTopRightRadius: BORDER_RADIUS,
          }}
        >
          {language}
        </Text>
      ) : null}
      <SyntaxHighlighter
        language={language}
        style={vs2015}
        showLineNumbers={true}
        customStyle={{
          borderBottomLeftRadius: BORDER_RADIUS,
          borderBottomRightRadius: BORDER_RADIUS,
          borderTopLeftRadius: label ? 0 : BORDER_RADIUS,
          borderTopRightRadius: label ? 0 : BORDER_RADIUS,
        }}
      >
        {cleanedCode}
      </SyntaxHighlighter>
    </Stack>
  )
}
