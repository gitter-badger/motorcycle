import { Sink } from '../../types'
import { Task } from './types'
import { curry2 } from '167'

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
