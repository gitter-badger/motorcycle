import { Disposable } from './types'

const NONE: Disposable = new class DisposeNone {
  dispose() {}
}()

/**
 * Creates a disposable that effectively does nothing
 */
export function disposeNone(): Disposable {
  return NONE
}
