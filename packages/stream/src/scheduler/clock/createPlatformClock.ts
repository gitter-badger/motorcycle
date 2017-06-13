import { Clock } from './types'
import { NodeClock } from './NodeClock'
import { RelativeClock } from './RelativeClock'

export function createPlatformClock(): Clock {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function')
    return new RelativeClock(performance, performance.now())
  else if (typeof process !== 'undefined' && typeof process.hrtime === 'function')
    return new NodeClock((origin: [number, number]) => process.hrtime(origin), process.hrtime())

  return new RelativeClock(Date, Date.now())
}
