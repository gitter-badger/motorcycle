import { Disposable } from './types'

export function disposeOnce(disposable: Disposable): Disposable {
  return new DisposeOnce(disposable)
}

class DisposeOnce implements Disposable {
  protected disposable: Disposable
  protected disposed: boolean = false

  constructor(disposable: Disposable) {
    this.disposable = disposable
  }

  public dispose(): void {
    if (!this.disposed) {
      this.disposed = true
      this.disposable.dispose()
    }
  }
}
