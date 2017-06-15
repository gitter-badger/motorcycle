import { TestCollection, describe, given, it } from '@typed/test'

import { once } from '../../sources'
import { runEffects } from './runEffects'

export const test: TestCollection = describe(`runEffects`, [
  given(`a stream`, [
    it(`returns a promise that resolves when the stream ends`, ({ equal }) => {
      const stream = once(1)

      return runEffects(stream).then(equal(void 0))
    })
  ])
])