import { Sink, Stream, createEndTask, createTestScheduler } from '../../'

/**
 * Given a time amount and a Stream it will return a Promise
 * of the amount of events that occur prior to the given time amount.
 * Very useful in testing environments.
 *
 * @name collectEventsFor :: int -> Stream a -> Promise [{ time :: int, value :: A }]
 * @example
 * import { collectEventsFor, once } from '@motorcycle/stream'
 * import * as assert from 'assert'
 *
 * it('returns expected events', () => {
 *   return collectEventsFor(100, once(1)).then(events => {
 *     assert.deepEqual(events, [ { time: 0, value: 1 } ])
 *   })
 * })
 */
export function collectEventsFor<A>(
  time: number,
  stream: Stream<A>
): Promise<Array<{ time: number; value: A }>> {
  return new Promise<Array<{ time: number; value: A }>>((resolve, reject) => {
    const events: Array<{ time: number; value: A }> = []

    const { tick, scheduler } = createTestScheduler()

    const sink: Sink<A> = {
      event(time: number, value: A) {
        events.push({ time, value })
      },
      error(_: number, error: Error) {
        reject(error)
      },
      end() {
        resolve(events)
      },
    }

    const task = createEndTask(sink)

    scheduler.delay(time, task)

    stream.run(sink, scheduler)

    tick(time)
  })
}
