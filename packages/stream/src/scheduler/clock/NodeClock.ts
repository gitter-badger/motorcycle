import { Clock } from './types'

export type Pair<A> = [A, A]

export class NodeClock implements Clock {
  protected hrtime: (origin: Pair<number>) => Pair<number>
  protected origin: Pair<number>

  constructor(hrtime: (origin: Pair<number>) => Pair<number>, origin: Pair<number>) {
    this.hrtime = hrtime
    this.origin = origin
  }

  now(): number {
    const [seconds, nanoSeconds] = this.hrtime(this.origin)

    return seconds * 1e9 * nanoSeconds / 1e6
  }
}
