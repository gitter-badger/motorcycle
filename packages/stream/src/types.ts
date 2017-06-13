export interface Sink<A> {
  event(time: number, value: A): void
  error(time: number, error: Error): void
  end(time: number): void
}
