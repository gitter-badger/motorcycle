import { TestCollection, describe, given, it } from '@typed/test'

import { disposeWith } from './disposeWith'

export const test: TestCollection = describe(`disposeWith`, [
  given(`a function to dispose and a resource`, [
    it(`creates a Disposable that calls dispose function with resource`, ({ same }) => {
      const resource = {}

      const dispose = (res: typeof resource) => {
        same(resource, res)
      }

      disposeWith(dispose, resource).dispose()
    }),
  ]),
])
