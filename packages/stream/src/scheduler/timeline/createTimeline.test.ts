import { ScheduledTask, createScheduledTask } from '../scheduledTask'
import { TestCollection, describe, given, it } from '@typed/test'

import { Timeline } from './types'
import { createEventTask } from '../task'
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

  describe(`nextArrival`, [
    given(`the timeline is empty`, [
      it(`returns Infinity`, ({ equal }) => {
        const timeline = createTimeline()
        equal(Infinity, timeline.nextArrival())
      }),
    ]),

    given(`the timeline is not empty`, [
      it(`returns the time of the first scheduled task time`, ({ equal }) => {
        const timeline: Timeline = createTimeline()
        const task = createEventTask(1, { event() {}, error() {}, end() {} })
        const scheduledTask = createScheduledTask(100, 0, 0, task, createScheduler())

        timeline.add(scheduledTask)

        equal(100, timeline.nextArrival())

        // this will remove all tasks with time <= 200 from timeline
        timeline.readyTasks(200)

        const scheduledTaskTwo = createScheduledTask(1000, 0, 0, task, createScheduler())

        timeline.add(scheduledTaskTwo)

        equal(1000, timeline.nextArrival())
      }),
    ]),
  ]),

  describe(`add`, [
    given(`a scheduled task`, [
      it(`adds the task to the timeline`, ({ same }) => {
        const timeline: Timeline = createTimeline()
        const task = createEventTask(1, { event() {}, error() {}, end() {} })
        const scheduledTask = createScheduledTask(100, 0, 0, task, createScheduler())

        timeline.add(scheduledTask)

        same(scheduledTask, timeline.readyTasks(200)[0])
      }),
    ]),
  ]),

  describe(`remove`, [
    given(`a scheduled task`, [
      it(`returns true if it can be removed`, ({ ok }) => {
        const timeline: Timeline = createTimeline()
        const task = createEventTask(1, { event() {}, error() {}, end() {} })
        const scheduledTask = createScheduledTask(100, 0, 0, task, createScheduler())

        timeline.add(scheduledTask)

        ok(timeline.remove(scheduledTask))
      }),

      it(`returns false if it can not be remove`, ({ notOk }) => {
        const timeline: Timeline = createTimeline()
        const task = createEventTask(1, { event() {}, error() {}, end() {} })
        const scheduledTask = createScheduledTask(100, 0, 0, task, createScheduler())

        notOk(timeline.remove(scheduledTask))
      }),
    ]),
  ]),

  describe(`removeAll`, [
    given(`a predicate (ScheduledTask -> boolean)`, [
      it(`removes all that match the predicate`, ({ equal }) => {
        const timeline: Timeline = createTimeline()
        const task = createEventTask(1, { event() {}, error() {}, end() {} })
        const scheduledTask = createScheduledTask(100, 0, 0, task, createScheduler())
        const scheduledTaskTwo = createScheduledTask(200, 0, 0, task, createScheduler())

        timeline.add(scheduledTask)
        timeline.add(scheduledTaskTwo)

        timeline.removeAll((scheduledTask: ScheduledTask) => scheduledTask.task === task)

        equal(0, timeline.readyTasks(5000).length)
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
