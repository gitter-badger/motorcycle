import { ScheduledTask } from '../scheduledTask'
import { Timeline } from './types'

/**
 * Creates a timeline that can be used to create a scheduler.
 * @name createTimeline :: () -> Timeline
 * @example
 * import {
 *   createTimeline,
 *   createTimer,
 *   createPlatformClock,
 *   createScheduler
 * } from '@motorcycle/stream'
 *
 * const timer = createTimer(createPlatformClock())
 * const timeline = createTimeline()
 * const scheduler = createScheduler(timer, timeline)
 */
export function createTimeline(): Timeline {
  return new BasicTimeline()
}

type Timeslot = { time: number; tasks: Array<ScheduledTask> }

class BasicTimeline implements Timeline {
  protected timeslots: Array<Timeslot> = []

  public isEmpty(): boolean {
    return this.timeslots.length === 0
  }

  public nextArrival(): number {
    return this.isEmpty() ? Infinity : this.timeslots[0].time
  }

  public add(scheduledTask: ScheduledTask): void {
    insertByTime(scheduledTask, this.timeslots)
  }

  public remove(scheduledTask: ScheduledTask): boolean {
    const i = binarySearch(getTime(scheduledTask), this.timeslots)

    if (i >= 0 && i < this.timeslots.length) {
      const at = this.timeslots[i].tasks.indexOf(scheduledTask)

      if (at >= 0) {
        this.timeslots[i].tasks.splice(at, 1)
        return true
      }
    }

    return false
  }

  public removeAll(predicate: (scheduledTask: ScheduledTask) => boolean): void {
    const { timeslots } = this
    for (const timeslot of timeslots) {
      timeslot.tasks = timeslot.tasks.filter((task: ScheduledTask) => !predicate(task))
    }
  }

  public readyTasks(now: number): ReadonlyArray<ScheduledTask> {
    const { timeslots } = this
    const scheduledTasks: Array<ScheduledTask> = []

    while (timeslots.length > 0 && timeslots[0].time <= now) {
      const { tasks } = timeslots.shift() as Timeslot

      scheduledTasks.push.apply(scheduledTasks, tasks)
    }

    return scheduledTasks
  }
}

function insertByTime(scheduledTask: ScheduledTask, timeslots: Array<Timeslot>) {
  const length = timeslots.length
  const time = getTime(scheduledTask)

  if (length === 0) {
    timeslots.push(newTimeslot(time, [scheduledTask]))
    return
  }

  const index = binarySearch(time, timeslots)

  if (index >= length) {
    timeslots.push(newTimeslot(time, [scheduledTask]))
  } else {
    insertAtTimeslot(scheduledTask, timeslots, time, index)
  }
}

function getTime(scheduledTask: ScheduledTask): number {
  return Math.floor(scheduledTask.time)
}

function newTimeslot(time: number, tasks: Array<ScheduledTask>) {
  return { time, tasks }
}

function binarySearch(time: number, timeslots: Array<Timeslot>) {
  let low = 0
  let high = timeslots.length
  let mid
  let timeslot

  while (low < high) {
    mid = Math.floor((low + high) / 2)
    timeslot = timeslots[mid]

    if (time === timeslot.time) {
      return mid
    } else if (time < timeslot.time) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  return high
}

function insertAtTimeslot(
  scheduledTask: ScheduledTask,
  timeslots: Array<Timeslot>,
  time: number,
  index: number
) {
  const timeslot = timeslots[index]
  if (time === timeslot.time) {
    addTask(scheduledTask, timeslot.tasks)
  } else {
    timeslots.splice(index, 0, newTimeslot(time, [scheduledTask]))
  }
}

function addTask(scheduledTask: ScheduledTask, tasks: Array<ScheduledTask>) {
  if (tasks.length === 0 || scheduledTask.time >= tasks[tasks.length - 1].time) {
    tasks.push(scheduledTask)
  } else {
    spliceTask(scheduledTask, tasks)
  }
}

function spliceTask(scheduledTask: ScheduledTask, tasks: Array<ScheduledTask>) {
  for (let index = 0; index < tasks.length; ++index) {
    if (scheduledTask.time < tasks[index].time) {
      tasks.splice(index, 0, scheduledTask)
      break
    }
  }
}
