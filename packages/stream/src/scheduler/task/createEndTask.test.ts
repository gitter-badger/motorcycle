import { TestCollection, describe, given, it } from '@typed/test'

import { createEndTask } from './createEndTask'

export const test: TestCollection = describe(`createEndTask`, [
  given(`a sink`, [
    it(`returns a task that runs a sink's end method`, ({ equal }) => {
      const expectedTime = 100

      const sink = {
        event() {},
        error() {},
        end(time: number) {
          equal(expectedTime, time)
        },
      }

      const task = createEndTask(sink)

      task.run(expectedTime)
    }),
  ]),
])
