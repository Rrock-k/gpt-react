import hljs from 'highlight.js'

export const detectLanguage = (code: string) => {
  const result = hljs.highlightAuto(code)
  return {
    language: result.language,
    value: result.value,
    code1: result.code,
  }
}
