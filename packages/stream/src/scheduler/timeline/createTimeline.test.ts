import { TestCollection, describe, given, it } from '@typed/test'

import { Timeline } from './types'
import { createEventTask } from '../task'
import { createScheduledTask } from '../scheduledTask'
import { createScheduler } from '../createScheduler'
import { createTimeline } from './createTimeline'

export const test: TestCollection = describe(`createTimeline`, [
  it(`creates a Timeline`, ({ ok }) => {
    const timeline: Timeline = createTimeline()

    ok(timeline.isEmpty())
  }),

  describe(`isEmpty`, [
    given(`The timeline is empty`, [
      it(`returns true`, ({ ok }) => {
        const timeline: Timeline = createTimeline()

        ok(timeline.isEmpty())
      }),
    ]),

    given(`a timeline is not empty`, [
      it(`returns false`, ({ notOk }) => {
        const timeline: Timeline = createTimeline()
        const task = createEventTask(1, { event() {}, error() {}, end() {} })
        const scheduledTask = createScheduledTask(0, 0, 0, task, createScheduler())

        timeline.add(scheduledTask)

        notOk(timeline.isEmpty())
      }),
    ]),
  ]),
])
