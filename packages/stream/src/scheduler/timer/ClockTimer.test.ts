import { TestCollection, describe, given, it } from '@typed/test'

import { ClockTimer } from './ClockTimer'
import { createPlatformClock } from '../clock'

export const test: TestCollection = describe(`ClockTimer`, [
  given(`a clock`, [
    it(`returns a Timer`, ({ equal }) => {
      const timer = new ClockTimer(createPlatformClock())

      equal(0, timer.now())
      equal('function', typeof timer.setTimer)
      equal('function', typeof timer.clearTimer)
    }),
  ]),
])
