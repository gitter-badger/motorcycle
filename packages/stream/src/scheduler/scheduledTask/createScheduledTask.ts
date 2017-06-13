import { ScheduledTask } from './types'
import { Scheduler } from '../types'
import { Task } from '../task'

export function createScheduledTask(
  time: number,
  offset: number,
  period: number,
  task: Task,
  scheduler: Scheduler
): ScheduledTask {
  return new BasicScheduledTask(time, offset, period, task, scheduler)
}

class BasicScheduledTask implements ScheduledTask {
  public task: Task
  public period: number
  public time: number
  public active: boolean = true
  protected offset: number
  protected scheduler: Scheduler

  constructor(time: number, offset: number, period: number, task: Task, scheduler: Scheduler) {
    this.time = time
    this.offset = offset
    this.period = period
    this.task = task
    this.scheduler = scheduler
  }

  run() {
    if (this.active) this.task.run(this.time - this.offset)
  }

  dispose() {
    this.active = false
    this.scheduler.cancel(this)
    this.task.dispose()
  }
}
