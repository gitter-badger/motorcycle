import { Disposable } from './types'
import { disposeOnce } from './disposeOnce'

/**
 * Given a function to disposable of a resource and the resource, creates a
 * Disposable that will call the given function with the resource
 *
 * @name disposeWith (a -> void) -> a -> Disposable
 * @example
 * import { disposeWith } from '@motorcycle/stream'
 *
 * const disposable = disposeWith(clearTimeout, setTimeout(doSomething, 1000))
 *
 * disposable.dispose()
 */
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
