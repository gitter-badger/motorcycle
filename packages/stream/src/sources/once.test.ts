import { TestCollection, describe, given, it } from '@typed/test'

import { createScheduler } from '../scheduler'
import { once } from './once'

export const test: TestCollection = describe(`once`, [
  given(`a value`, [
    it(`returns a stream of that value`, ({ equal }, done) => {
      const stream = once(1)

      const scheduler = createScheduler()
      const sink = {
        event: (time, value) => {
          equal(1, value)
          done()
        },
        error() {},
        end() {},
      }

      stream.run(sink, scheduler)
    }),
    it(`returns a stream of that ends`, ({ equal }, done) => {
      const stream = once(1)

      const scheduler = createScheduler()
      const sink = {
        event: (time, value) => {
          equal(1, value)
        },
        error() {},
        end() {
          done()
        },
      }

      stream.run(sink, scheduler)
    }),
    it(`does not emit after being disposed`, ({ ok }, done) => {
      const stream = once(1)
      const scheduler = createScheduler()
      const sink = {
        event: () => {
          done(new Error(`Should not be called`))
        },
        error() {},
        end() {},
      }

      ok(true)

      setTimeout(() => {
        done()
      }, 10)

      stream.run(sink, scheduler).dispose()
    }),
  ]),
])
