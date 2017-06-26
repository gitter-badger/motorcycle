import { Disposable } from './types'

/**
 * Given a Disposable it will ensure that a disposable will only ever
 * be dispose()d of once
 *
 * @name disposeOnce :: Disposable -> Disposable
 * @example
 * import { disposeOnce } from '@motorcycle/stream'
 *
 * const disposable = disposeOnce(disposableOne)
 *
 * disposable.dispose()
 */
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
