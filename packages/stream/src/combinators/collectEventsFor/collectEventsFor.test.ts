import { TestCollection, describe, given, it } from '@typed/test'

import { collectEventsFor } from './collectEventsFor'
import { once } from '../../sources'

export const test: TestCollection = describe(`collectEventsFor`, [
  given(`an amount of time and stream`, [
    it(`returns { time, value } pairs`, async ({ equal }) => {
      const stream = once(1000)

      const events = await collectEventsFor(500, stream)

      equal(1, events.length)

      const [{ time, value }] = events

      equal(0, time)
      equal(1000, value)
    }),
  ]),
])
