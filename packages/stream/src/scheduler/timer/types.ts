import { Disposable } from '../../disposable'

export interface Timer {
  now(): number
  setTimer(fn: () => void, delayTime: number): Disposable
  clearTimer(disposable: Disposable): void
}
