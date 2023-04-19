import { WrappedMessage } from '@/types'

/**
 * This is the instruction for GPT model to generate snippets of code.
 * It can be used to send initial instructions to the model.
 */
const codeSnippetsFormattingInstruction =
  "Here are the formatting rules for syntax highlighting code snippets using backticks:\n\n1. Surround the code with three backticks (\\`\\`\\`) before and after the code block.\n2. Specify the language after the opening backticks.\n3. Add a newline character before and after the code block to separate it from other text.\n4. Use the correct language identifier to ensure the syntax highlighting works correctly.\n\nHere's an example of what the properly formatted code block looks like using these rules:\n\n```javascript\nconst a = 1;\nconst b = a + 4;\n```\n\nI hope this helps!"

export const codeSnippetsFormattingInstructionMessage: WrappedMessage = {
  hidden: true,
  message: {
    role: 'system',
    content: codeSnippetsFormattingInstruction,
  },
}
