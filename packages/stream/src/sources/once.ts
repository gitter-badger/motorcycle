import { Disposable, disposeAll } from '../disposable'
import { Scheduler, createEndTask, createEventTask } from '../scheduler'
import { Sink, Stream } from '../types'

export function once<A>(value: A): Stream<A> {
  return new Once<A>(value)
}

class Once<A> implements Stream<A> {
  protected value: A

  constructor(value: A) {
    this.value = value
  }

  public run(sink: Sink<A>, scheduler: Scheduler): Disposable {
    const { value } = this

    const eventTask = createEventTask(value, sink)
    const endTask = createEndTask(sink)

    return disposeAll([scheduler.asap(eventTask), scheduler.asap(endTask)])
  }
}
