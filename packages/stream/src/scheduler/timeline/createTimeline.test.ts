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

  describe(`readyTasks`, [
    given(`the current time`, [
      it(`returns the ready tasks`, ({ equal }) => {
        const timeline: Timeline = createTimeline()
        const sink = { event() {}, error() {}, end() {} }
        const scheduler = createScheduler()

        const taskOne = createEventTask(1, sink)
        const scheduledTaskOne = createScheduledTask(0, 0, -1, taskOne, scheduler)

        const taskTwo = createEventTask(2, sink)
        const scheduledTaskTwo = createScheduledTask(10, 0, -1, taskTwo, scheduler)

        timeline.add(scheduledTaskOne)
        timeline.add(scheduledTaskTwo)

        const readyTasks = timeline.readyTasks(1000)

        equal([scheduledTaskOne, scheduledTaskTwo], readyTasks)
      }),
    ]),
  ]),
])
