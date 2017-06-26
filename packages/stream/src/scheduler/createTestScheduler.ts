import { Timeline, createTimeline } from './timeline'

import { Scheduler } from './types'
import { createScheduler } from './createScheduler'
import { createVirtualTimer } from './timer'

export interface TestScheduler {
  tick(elapsedTime: number): void
  scheduler: Scheduler
}

export function createTestScheduler(timeline: Timeline = createTimeline()): TestScheduler {
  const { tick, timer } = createVirtualTimer()

  const scheduler = createScheduler(timer, timeline)

  return { tick, scheduler }
}
