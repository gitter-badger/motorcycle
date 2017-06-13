import { TestCollection, describe, given, it } from '@typed/test'

import { disposeAll } from './disposeAll'

export const test: TestCollection = describe(`disposeAll`, [
  given(`n number of disposables`, [
    it(`disposes of all disposables`, ({ equal }) => {
      let callCount = 0
      const disposable = {
        dispose: () => {
          ++callCount
        },
      }

      disposeAll([disposable, disposable, disposable, disposable]).dispose()

      equal(4, callCount)
    }),
  ]),
])
