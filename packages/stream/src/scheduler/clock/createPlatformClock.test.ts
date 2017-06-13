import { TestCollection, describe, it } from '@typed/test'

import { Clock } from './types'
import { createPlatformClock } from './createPlatformClock'

export const test: TestCollection = describe(`createPlatformClock`, [
  it(`returns a Clock`, ({ equal }) => {
    const clock: Clock = createPlatformClock()

    equal(0, clock.now())
  }),
])
