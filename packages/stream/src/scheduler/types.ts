import { ScheduledTask } from './scheduledTask'
import { Task } from './task'

export interface Scheduler {
  now(): number
  asap(task: Task): ScheduledTask
  delay(delayTime: number, task: Task): ScheduledTask
  periodic(period: number, task: Task): ScheduledTask
  schedule(delayTime: number, period: number, task: Task): ScheduledTask
  scheduleTask(offsetTime: number, delay: number, period: number, task: Task): ScheduledTask
  relative(offsetTime: number): Scheduler
  cancel(scheduledTask: ScheduledTask): void
  cancelAll(predicate: (task: ScheduledTask) => boolean): void
}
