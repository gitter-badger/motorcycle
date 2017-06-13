import { TestCollection, describe, given, it } from '@typed/test'

import { NodeClock } from './NodeClock'

export const test: TestCollection = describe(`NodeClock`, [
  given(`([number, number] -> [number, number]) -> [number, number]`, [
    it(`returns a clock`, ({ equal }) => {
      const hrtime = (origin: [number, number]): [number, number] => [
        origin[0] + 50,
        origin[1] + 50,
      ]

      const origin: [number, number] = [100, 100]

      const clock = new NodeClock(hrtime, origin)

      equal(22500000, clock.now())
    }),
  ]),
])
