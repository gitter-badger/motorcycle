import { Clock } from '../clock'
import { ClockTimer } from './ClockTimer'
import { Timer } from './types'

export function createTimer(clock: Clock): Timer {
  return new ClockTimer(clock)
}
