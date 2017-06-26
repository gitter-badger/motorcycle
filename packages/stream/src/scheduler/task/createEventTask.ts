import { Sink } from '../../types'
import { Task } from './types'
import { curry2 } from '167'

/**
 * Given a value and a Sink, creates a Task that will emit the given value on the
 * given Sink.
 *
 * @name createEventTask :: a -> Sink a -> Task
 * @example
 * import { Stream, Sink, Scheduler, createEventTask } from '@motorcycle/stream'
 *
 * // creates a stream that will never end and only ever emit given value
 * function only<A>(value: A): Stream<A> {
 *   function run (sink: Sink<A>, scheduler: Scheduler) {
 *     return scheduler.asap(createEventTask(value, sink))
 *   }
 *
 *   return { run }
 * }
 */
export const createEventTask: CreateEventTask = curry2(function createEventTask<A>(
  value: A,
  sink: Sink<A>
): Task {
  return new EventTask<A>(value, sink)
})

class EventTask<A> implements Task {
  protected value: A
  protected sink: Sink<A>
  protected disposed: boolean = false

  constructor(value: A, sink: Sink<A>) {
    this.value = value
    this.sink = sink
  }

  public run(time: number): void {
    if (!this.disposed) this.sink.event(time, this.value)
  }

  public dispose(): void {
    this.disposed = true
  }
}

export interface CreateEventTask {
  <A>(value: A, sink: Sink<A>): Task
  <A>(value: A): (sink: Sink<A>) => Task
}
