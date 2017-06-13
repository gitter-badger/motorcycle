import { Disposable } from './types'

const NONE: Disposable = new class DisposeNone {
  dispose() {}
}()

export function disposeNone(): Disposable {
  return NONE
}
