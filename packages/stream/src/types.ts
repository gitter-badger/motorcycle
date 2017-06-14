import { Disposable } from './disposable'
import { Scheduler } from './scheduler'

export interface Stream<A> {
  run(sink: Sink<A>, scheduler: Scheduler): Disposable
}

export interface MulticastStream<A> extends Stream<A>, Sink<A> {}

export interface Sink<A> {
  event(time: number, value: A): void
  error(time: number, error: Error): void
  end(time: number): void
}
