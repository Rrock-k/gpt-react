import type { LogColoredType } from './types'

/**
 * add here any colors which you want to see in Intellisense autocomplete
 * list of possible colors here https://reactnative.dev/docs/colors
 */
export const LOG_COLORS = {
  default: 'crimson',
  crimson: 'crimson',
  darkOrchid: 'darkOrchid',
  forestgreen: 'forestgreen',
  yellow: 'yellow',
  gold: 'gold',
}

export const LOG_FUNCTIONS = {
  log: console.log,
  groupCollapsed: console.groupCollapsed,
  group: console.group,
  warn: console.warn,
  error: console.error,
}

/**
 * Logs colored string to console.
 * Only first argument is colored
 *
 * USAGE:
 * logColored.crimson('string to log')
 *
 * logColored.blue.groupCollapsed('string to log')
 */
export const logColored = (() => {
  const defaultColor = { current: LOG_COLORS.default }
  const setDefaultColor = (color: string) => {
    defaultColor.current = color
  }

  const getLogFunction = (
    color = defaultColor.current,
    logFunc = console.log
  ) => {
    return (first: unknown, ...args: unknown[]) => {
      if (args.length !== 0 || typeof first === 'string')
        return logFunc(`%c${first}`, `color: ${color}`, ...args)
      logFunc(first)
    }
  }

  const proxyHandler = {
    get: (target: unknown, prop: string) => {
      if (prop === 'setDefaultColor') return setDefaultColor
      const color = prop

      const resultFunc: {
        [key in keyof typeof LOG_FUNCTIONS]?: typeof LOG_FUNCTIONS[key]
      } & {
        (first: unknown, ...args: unknown[]): void
      } = getLogFunction(color)
      for (const method in LOG_FUNCTIONS) {
        // @ts-ignore
        resultFunc[method as keyof typeof LOG_FUNCTIONS] = getLogFunction(
          color,
          LOG_FUNCTIONS[method as keyof typeof LOG_FUNCTIONS]
        )
      }
      return resultFunc
    },

    apply: (
      target: unknown,
      thisArg: unknown,
      argumentsList: [unknown, ...unknown[]]
    ) => {
      const logFunction = getLogFunction()
      logFunction(...argumentsList)
    },
  }

  return new Proxy(() => undefined, proxyHandler) as LogColoredType
})()
