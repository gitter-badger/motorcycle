import { Disposable } from './types'

/**
 * Given an array of disposables, creates a Disposable that will dispose of
 * all given disposables.
 *
 * @name disposeAll :: [Disposable] -> Disposable
 * @example
 * import { disposeAll } from '@motorcycle/stream'
 *
 * const disposable = disposeAll([ disposableOne, disposableTwo ])
 *
 * disposable.dispose()
 */
export function disposeAll(disposables: Array<Disposable>): Disposable {
  return new DisposeAll(disposables)
}

class DisposeAll implements Disposable {
  protected disposables: Array<Disposable>

  constructor(disposables: Array<Disposable>) {
    this.disposables = disposables
  }

  public dispose(): void {
    const { disposables } = this

    disposables.forEach(disposable => disposable.dispose())
  }
}
