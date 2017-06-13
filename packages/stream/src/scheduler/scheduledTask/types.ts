import { Disposable } from '../../disposable'
import { Task } from '../task'

export interface ScheduledTask extends Disposable {
  task: Task
  time: number
  period: number
  active: boolean
  run(): void
}
