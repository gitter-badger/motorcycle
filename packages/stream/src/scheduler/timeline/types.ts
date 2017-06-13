import { ScheduledTask } from '../scheduledTask'

export interface Timeline {
  add(scheduledTask: ScheduledTask): void
  remove(scheduledTask: ScheduledTask): boolean
  removeAll(predicate: (scheduledTask: ScheduledTask) => boolean): void
  isEmpty(): boolean
  nextArrival(): number
  readyTasks(time: number): ReadonlyArray<ScheduledTask>
}
