import { Clock } from './types'

export class NodeClock implements Clock {
  protected hrtime: (origin: [number, number]) => [number, number]
  protected origin: [number, number]

  constructor(hrtime: (origin: [number, number]) => [number, number], origin: [number, number]) {
    this.hrtime = hrtime
    this.origin = origin
  }

  now() {
    const [seconds, nanoSeconds] = this.hrtime(this.origin)

    return seconds * 1e9 * nanoSeconds / 1e6
  }
}
