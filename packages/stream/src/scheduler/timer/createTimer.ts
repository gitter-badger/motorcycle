import { Clock } from '../clock'
import { ClockTimer } from './ClockTimer'
import { Timer } from './types'

/**
 * Given a Clock it returns a Timer
 * @name createTimer :: Clock -> Timer
 * @example
 * import { createPlatformClock, createTimer } from '@motorcycle/stream'
 *
 * const timer = createTimer(createPlatformClock())
 */
export function createTimer(clock: Clock): Timer {
  return new ClockTimer(clock)
}
