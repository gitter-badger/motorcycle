import { Disposable, disposeSettable } from '../../disposable'
import { Scheduler, Sink, Stream } from '../../'

export function runEffects<A>(stream: Stream<A>, scheduler: Scheduler): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const disposable = disposeSettable()

    const sink = new RunEffectsSink<A>(resolve, reject, disposable)

    disposable.setDisposable(stream.run(sink, scheduler))
  })
}

class RunEffectsSink<A> implements Sink<A> {
  protected _end: () => void
  protected _error: (err: Error) => void
  protected _disposable: Disposable
  protected _active: boolean = true

  constructor(end: () => void, error: (err: Error) => void, disposable: Disposable) {
    this._end = end
    this._error = error
    this._disposable = disposable
  }

  public event() {}

  public error(_: number, error: Error) {
    this.dispose(this._error, this._error, error)
  }

  public end() {
    if (!this._active) return
    this.dispose(this._error, this._end, void 0)
  }

  private dispose(error: (err: Error) => void, end: (err?: Error) => void, x: any) {
    this._active = false
    tryDispose(error, end, x, this._disposable)
  }
}

function tryDispose(
  error: (err: Error) => void,
  end: (err?: Error) => void,
  x: any,
  disposable: Disposable
) {
  try {
    disposable.dispose()
  } catch (e) {
    error(e)
    return
  }

  end(x)
}
