import { Sink } from '../../types'
import { Task } from './types'

/**
 * Given a sink, creates a Task take will emit and end signal to the given sink.
 *
 * @name createEndTask :: Sink * -> Task
 * @example
 * import { Stream, Sink, Scheduler, createEndTask } from '@motorcycle/stream'
 *
 * // creates a stream that immediately ends after observation
 * function empty(): Stream<any> {
 *   function run(sink: Sink<any>, scheduler: Scheduler) {
 *     return scheduler.asap(createEndTask(sink))
 *   }
 *
 *   return { run }
 * }
 */
export function createEndTask(sink: Sink<any>): Task {
  return new EndTask(sink)
}

class EndTask implements Task {
  protected sink: Sink<any>
  protected disposed: boolean = false

  constructor(sink: Sink<any>) {
    this.sink = sink
  }

  public run(time: number): void {
    if (!this.disposed) this.sink.end(time)
  }

  public dispose(): void {
    this.disposed = true
  }
}
