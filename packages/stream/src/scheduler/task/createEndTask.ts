import { Sink } from '../../types'
import { Task } from './types'

export function createEndTask(sink: Sink<any>): Task {
  return new EndTask(sink)
}

class EndTask implements Task {
  protected sink: Sink<any>
  protected disposed: boolean = false

  constructor(sink: Sink<any>) {
    this.sink = sink
  }

  public run(time: number): void {
    if (!this.disposed) this.sink.end(time)
  }

  public dispose(): void {
    this.disposed = true
  }
}
