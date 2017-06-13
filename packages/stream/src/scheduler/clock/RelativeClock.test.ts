import { TestCollection, describe, given, it } from '@typed/test'

import { Clock } from './types'
import { RelativeClock } from './RelativeClock'

export const test: TestCollection = describe(`RelativeClock`, [
  given(`a Clock and the current time`, [
    it(`returns a clock that returns relative time`, ({ equal }) => {
      const testClock: Clock = { now: () => 100 }
      const relativeClock: Clock = new RelativeClock(testClock, 50)

      equal(50, relativeClock.now())
    }),
  ]),
])
