import { Clock } from './types'
import { NodeClock } from './NodeClock'
import { RelativeClock } from './RelativeClock'

/**
 * Creates a Clock that works best on any given platform.
 * Where supported, monotonic time is used, with a fallback to Date.now.
 * All platforms start from time 0 and relatively increment over time.
 *
 * @name :: createPlatformClock :: () -> Clock
 * @example
 * import { createPlatformClock } from '@motorcycle/stream'
 *
 * const clock = createPlatformClock
 *
 * console.log(clock.now()) // 0
 */
export function createPlatformClock(): Clock {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function')
    return new RelativeClock(performance, performance.now())
  else if (typeof process !== 'undefined' && typeof process.hrtime === 'function')
    return new NodeClock((origin: [number, number]) => process.hrtime(origin), process.hrtime())

  return new RelativeClock(Date, Date.now())
}
