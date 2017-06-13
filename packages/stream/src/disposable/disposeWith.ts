import { Disposable } from './types'
import { disposeOnce } from './disposeOnce'

export function disposeWith<A>(dispose: (resource: A) => void, resource: A): Disposable {
  return disposeOnce(new DisposeWith<A>(dispose, resource))
}

class DisposeWith<A> implements Disposable {
  protected _dispose: (resource: A) => void
  protected _resource: A

  constructor(dispose: (resource: A) => void, resource: A) {
    this._dispose = dispose
    this._resource = resource
  }

  public dispose(): void {
    this._dispose(this._resource)
  }
}
