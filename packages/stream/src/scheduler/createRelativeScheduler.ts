import { ScheduledTask } from './scheduledTask'
import { Scheduler } from './types'
import { Task } from './task'

export function createRelativeScheduler(origin: number, scheduler: Scheduler): Scheduler {
  return new RelativeScheduler(origin, scheduler)
}

class RelativeScheduler implements Scheduler {
  protected origin: number
  protected scheduler: Scheduler

  constructor(origin: number, scheduler: Scheduler) {
    this.origin = origin
    this.scheduler = scheduler
  }

  public now() {
    return this.scheduler.now() - this.origin
  }

  public asap(scheduledTask: ScheduledTask) {
    return this.scheduleTask(0, 0, -1, scheduledTask)
  }

  public delay(delayTime: number, scheduledTask: ScheduledTask) {
    return this.scheduleTask(0, delayTime, -1, scheduledTask)
  }

  public periodic(period: number, scheduledTask: ScheduledTask) {
    return this.scheduleTask(0, 0, period, scheduledTask)
  }

  public schedule(delay: number, period: number, scheduledTask: ScheduledTask) {
    return this.scheduleTask(0, delay, period, scheduledTask)
  }

  public scheduleTask(localOffset: number, delay: number, period: number, task: Task) {
    return this.scheduler.scheduleTask(localOffset + this.origin, delay, period, task)
  }

  public relative(origin: number) {
    return new RelativeScheduler(origin + this.origin, this.scheduler)
  }

  public cancel(task: ScheduledTask) {
    return this.scheduler.cancel(task)
  }

  public cancelAll(predicate: (scheduledTask: ScheduledTask) => boolean) {
    return this.scheduler.cancelAll(predicate)
  }
}
