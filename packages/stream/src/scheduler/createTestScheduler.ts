import { Timeline, createTimeline } from './timeline'

import { Scheduler } from './types'
import { createScheduler } from './createScheduler'
import { createVirtualTimer } from './timer'

export interface TestScheduler {
  tick(elapsedTime: number): void
  scheduler: Scheduler
}

/**
 * Optionally given a Timeline it will create a TestScheduler
 *
 * @name createTestScheduler :: timeline -> TestScheduler
 * @example
 * import { createTestScheduler } from '@motorcycle/stream'
 *
 * const { tick, scheduler } = createTestScheduler()
 */
export function createTestScheduler(timeline: Timeline = createTimeline()): TestScheduler {
  const { tick, timer } = createVirtualTimer()

  const scheduler = createScheduler(timer, timeline)

  return { tick, scheduler }
}
