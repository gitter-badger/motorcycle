import { Sink } from '../../types'
import { Task } from './types'
import { curry2 } from '167'

/**
 * Given an Error and a Sink, creates a Task that will emit the given error
 * to one the given Sink.
 *
 * @name createErrorTask :: Error -> Sink * -> Task
 * @example
 * import { Stream, Sink, Scheduler, createErrorTask }
 *
 * // creates a Stream that will immediately error upon observation
 * function throwError(error: Error): Stream<never> {
 *   function run(sink: Sink<any>, scheduler: Scheduler) {
 *     return scheduler.asap(createErrorTask(error, sink))
 *   }
 *
 *   return { run }
 * }
 */
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
