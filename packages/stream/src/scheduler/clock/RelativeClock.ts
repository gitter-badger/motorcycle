import { Clock } from './types'

export class RelativeClock implements Clock {
  protected clock: Clock
  protected origin: number

  constructor(clock: Clock, origin: number) {
    this.clock = clock
    this.origin = origin
  }

  public now(): number {
    return this.clock.now() - this.origin
  }
}
