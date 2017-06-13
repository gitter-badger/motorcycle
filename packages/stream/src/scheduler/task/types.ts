import { Disposable } from '../../disposable'

export interface Task extends Disposable {
  run(time: number): void
}
