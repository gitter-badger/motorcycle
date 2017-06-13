import { TestCollection, describe, given, it } from '@typed/test'

import { disposeOnce } from './disposeOnce'

export const test: TestCollection = describe(`disposeOnce`, [
  given(`a disposable`, [
    it(`returns a disposable that disposes at most 1 time`, ({ equal }) => {
      let callCount = 0
      const disposable = disposeOnce({
        dispose: () => {
          ++callCount
        },
      })

      disposable.dispose()
      equal(1, callCount)
      disposable.dispose()
      equal(1, callCount)
    }),
  ]),
])
