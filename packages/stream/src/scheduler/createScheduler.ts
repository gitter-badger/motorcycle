import { ScheduledTask, createScheduledTask } from './scheduledTask'
import { Timeline, createTimeline } from './timeline'
import { Timer, createTimer } from './timer'

import { Disposable } from '../disposable'
import { Scheduler } from './types'
import { Task } from './task'
import { createPlatformClock } from './clock'
import { createRelativeScheduler } from './createRelativeScheduler'

export function createScheduler(
  timer: Timer = createTimer(createPlatformClock()),
  timeline: Timeline = createTimeline()
): Scheduler {
  return new BasicScheduler(timer, timeline)
}

class BasicScheduler implements Scheduler {
  protected timer: Timer
  protected timeline: Timeline
  protected disposable: Disposable | null = null
  protected nextArrival: number | null = null
  protected runReadyTasksBound: () => void

  constructor(timer: Timer, timeline: Timeline) {
    this.timer = timer
    this.timeline = timeline

    this.runReadyTasksBound = () => this.runReadyTasks()
  }

  public now(): number {
    return this.timer.now()
  }

  public asap(task: Task): ScheduledTask {
    return this.scheduleTask(0, 0, -1, task)
  }

  public delay(delayTime: number, task: Task): ScheduledTask {
    return this.scheduleTask(0, delayTime, -1, task)
  }

  public periodic(period: number, task: Task): ScheduledTask {
    return this.scheduleTask(0, 0, period, task)
  }

  public schedule(delay: number, period: number, task: Task): ScheduledTask {
    return this.scheduleTask(0, delay, period, task)
  }

  public scheduleTask(offset: number, delay: number, period: number, task: Task): ScheduledTask {
    const time = this.now() + Math.max(0, delay)
    const scheduledTask = createScheduledTask(time, offset, period, task, this)

    this.timeline.add(scheduledTask)

    this.scheduleNextRun()

    return scheduledTask
  }

  public relative(offset: number): Scheduler {
    return createRelativeScheduler(offset, this)
  }

  public cancel(scheduledTask: ScheduledTask) {
    scheduledTask.active = false
    if (this.timeline.remove(scheduledTask)) this.reschedule()
  }

  public cancelAll(predicate: (scheduledTask: ScheduledTask) => boolean) {
    this.timeline.removeAll(predicate)
    this.reschedule()
  }

  private reschedule() {
    if (this.timeline.isEmpty()) {
      this.unschedule()
    } else {
      this.scheduleNextRun()
    }
  }

  private scheduleNextRun() {
    if (this.timeline.isEmpty()) return

    const nextArrival = this.timeline.nextArrival()

    if (this.timer === null) {
      this.scheduleNextArrival(nextArrival)
    } else if (nextArrival < (this.nextArrival || Infinity)) {
      this.unschedule()
      this.scheduleNextArrival(nextArrival)
    }
  }

  private unschedule() {
    if (this.disposable) this.timer.clearTimer(this.disposable)
    this.disposable = null
  }

  private scheduleNextArrival(nextArrival: number) {
    this.nextArrival = nextArrival
    const delay = Math.max(0, nextArrival - this.now())
    this.disposable = this.timer.setTimer(this.runReadyTasksBound, delay)
  }

  private runReadyTasks() {
    this.disposable = null
    const tasks = this.timeline.readyTasks(this.now())

    for (const task of tasks) {
      if (task.active) task.run()

      if (task.period >= 0 && task.active) {
        task.time = task.time + task.period

        this.timeline.add(task)
      }
    }

    this.scheduleNextRun()
  }
}
