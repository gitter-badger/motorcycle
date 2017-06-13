import { Disposable, disposeWith } from '../../disposable'

import { Clock } from '../clock'
import { Timer } from './types'

export class ClockTimer implements Timer {
  protected clock: Clock

  constructor(clock: Clock) {
    this.clock = clock
  }

  public now(): number {
    return this.clock.now()
  }

  setTimer(fn: () => void, delayTime: number): Disposable {
    if (delayTime > 0) return disposeWith(clearTimeout, setTimeout(fn, delayTime))

    const task = new AsapDisposable(fn)

    Promise.resolve(task).then(task => task.run())

    return task
  }

  clearTimer(disposable: Disposable): void {
    disposable.dispose()
  }
}

class AsapDisposable implements Disposable {
  protected fn: () => void
  protected disposed: boolean = false

  constructor(fn: () => void) {
    this.fn = fn
  }

  public run() {
    if (!this.disposed) this.fn()
  }

  public dispose(): void {
    this.disposed = true
  }
}
