import { TestCollection, describe, given, it } from '@typed/test'

import { createErrorTask } from './createErrorTask'

export const test: TestCollection = describe(`createErrorTask`, [
  given(`and error and a sink`, [
    it(`returns a task that runs a sink's error method`, ({ same }) => {
      const expectedTime = 100
      const error = new Error(`foo`)

      const sink = {
        event() {},
        error(time: number, err: Error) {
          same(error, err)
          same(expectedTime, time)
        },
        end() {},
      }

      const task = createErrorTask(error, sink)

      task.run(expectedTime)
    }),
  ]),
])
