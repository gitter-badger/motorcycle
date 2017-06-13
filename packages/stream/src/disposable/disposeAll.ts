import { Disposable } from './types'

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
