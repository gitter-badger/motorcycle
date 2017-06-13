import { Sink } from '../../types'
import { Task } from './types'
import { curry2 } from '167'

export const createErrorTask: CreateErrorTask = curry2(function createErrorTask(
  error: Error,
  sink: Sink<any>
): Task {
  return new ErrorTask(error, sink)
})

class ErrorTask implements Task {
  protected error: Error
  protected sink: Sink<any>
  protected disposed: boolean = false

  constructor(value: Error, sink: Sink<any>) {
    this.error = value
    this.sink = sink
  }

  public run(time: number): void {
    if (!this.disposed) this.sink.error(time, this.error)
  }

  public dispose(): void {
    this.disposed = true
  }
}

export interface CreateErrorTask {
  (error: Error, sink: Sink<any>): Task
  (error: Error): (sink: Sink<any>) => Task
}
