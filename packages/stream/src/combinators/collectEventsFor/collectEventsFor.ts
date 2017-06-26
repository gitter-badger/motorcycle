import { Sink, Stream, createEndTask, createTestScheduler } from '../../'

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
