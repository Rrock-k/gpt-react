/* eslint-disable */
import { consoleLogColored, LOG_COLORS, LOG_FUNCTIONS } from './log-colored'

type ColorName = keyof typeof LOG_COLORS
type Loggers = keyof typeof LOG_FUNCTIONS

type LoggerFunctionObject = Function & { [Propery in Loggers]: () => void }

export type LogColoredType = LoggerFunctionObject & {
  setDefaultColor: (color: string) => void
} & {
  [Property in ColorName]: LoggerFunctionObject
}
