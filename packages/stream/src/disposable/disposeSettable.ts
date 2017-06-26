import { Disposable } from './types'

/**
 * Creates a Disposable that allows setting the underlying Disposable after
 * creation.
 *
 * @name disposeSettable :: () -> SettableDisposable
 */
export function disposeSettable(): SettableDisposable {
  return new SettableDisposable()
}

export class SettableDisposable implements Disposable {
  protected disposable: Disposable | void
  protected disposed: boolean = false
  protected _resolve: ((value: any) => void)
  protected result: Promise<any>

  constructor() {
    this.disposable = void 0
    this.disposed = false

    this.result = new Promise(resolve => {
      this._resolve = resolve
    })
  }

  setDisposable(disposable: Disposable) {
    if (this.disposable !== void 0) throw new Error('setDisposable called more than once')

    this.disposable = disposable

    if (this.disposed) disposable.dispose()
  }

  dispose() {
    if (this.disposed) return

    this.disposed = true

    if (this.disposable !== void 0) this.disposable.dispose()
  }
}
