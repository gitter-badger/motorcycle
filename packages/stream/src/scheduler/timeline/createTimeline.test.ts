import { TestCollection, describe, it } from '@typed/test'

import { Timeline } from './types'
import { createTimeline } from './createTimeline'

export const test: TestCollection = describe(`createTimeline`, [
  it(`creates a Timeline`, ({ ok }) => {
    const timeline: Timeline = createTimeline()

    ok(timeline.isEmpty())
  }),
])
