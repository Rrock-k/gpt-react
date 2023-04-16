import { logColored } from './logColored'

import { useRef } from 'react'
import { isEqual as lodashIsEqual, isObject as lodashIsObject } from 'lodash'

const IS_LOGGING_ON = true
const __DEV__ = process.env.NODE_ENV === 'development'
const IS_RUNNING_ON_SERVER = typeof window === 'undefined'

export const getRenderCountLogger = (name: string): (() => void) => {
  if (!__DEV__ || !IS_LOGGING_ON) {
    return () => undefined
  }
  let count = 1
  return function () {
    console.log('------*-***-*------')
    console.log(`${name} renders: ${count++} times`)
    console.log('------*-***-*------')
  }
}

/**
 * @param {*} value value to track
 * @param {?*} name (optional) name of value to use in log
 * @param {{ isEnabled: boolean, color: string }} options (optional) can specificy whether enabled or not
 * @returns {boolean} true if value has changed, otherwise false
 */
export const useLogValue = (() => {
  if (!__DEV__ || IS_RUNNING_ON_SERVER) {
    return () => undefined
  }

  return <T>(
    value: T,
    name: string,
    options: { isEnabled?: boolean; color?: string } = {}
  ) => {
    const ref = useRef<T>()

    const { isEnabled = true, color } = options

    const logFunc =
      color != null ? logColored[color as keyof typeof logColored] : logColored

    if (!isEnabled) {
      return false
    }

    const prevValue = ref.current
    const isNew = prevValue !== value
    if (!isNew) {
      return false
    }

    logColored[(color ?? 'crimson') as keyof typeof logColored].groupCollapsed(
      name ? `new ${name}` : 'value has changed!',
      value
    )

    const isObject = lodashIsObject(prevValue) || lodashIsObject(value)

    logFunc('previous: ', prevValue)
    logFunc('current: ', value)

    const diffs = getObjectDiff(prevValue, value)
    if (isObject && diffs) {
      logFunc('CHANGED FIELDS:', diffs)
    }

    console.groupEnd()

    ref.current = value
    return true
  }
})()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getObjectDiff(obj1: any = {}, obj2: any = {}): string[] | undefined {
  let result: string[] | undefined

  // if (obj1 instanceof Object && obj2 instanceof Object) {
  try {
    const obj1Keys = lodashIsObject(obj1) ? Object.keys(obj1) : []
    const obj2Keys = lodashIsObject(obj2) ? Object.keys(obj2) : []

    result = obj2Keys

    obj1Keys.forEach((key) => {
      const keyIsNotInObj2 = !Object.getOwnPropertyDescriptor(obj2, key)
      if (keyIsNotInObj2) {
        return result?.push(key)
      }

      const areEqual = lodashIsEqual(
        obj1[key as keyof typeof obj1],
        obj2[key as keyof typeof obj2]
      )
      if (areEqual) {
        result?.splice(result.indexOf(key), 1)
      }
    })
  } catch (error) {
    console.error(error)
  }
  // }

  return result
}

export { logColored }
