import { TestCollection, describe, given, it } from '@typed/test'

import { createEventTask } from './createEventTask'

export const test: TestCollection = describe(`createEventTask`, [
  given(`and error and a sink`, [
    it(`returns a task that runs a sink's error method`, ({ same }) => {
      const expectedTime = 100
      const expected = {}

      const sink = {
        event(time: number, value: typeof expected) {
          same(expected, value)
          same(expectedTime, time)
        },
        error() {},
        end() {},
      }

      const task = createEventTask(expected, sink)

      task.run(expectedTime)
    }),
  ]),
])
