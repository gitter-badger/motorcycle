import { Disposable, disposeWith } from '../../disposable'

import { Timer } from './types'

export function createVirtualTimer(
  now: number = 0
): { tick: (elapsedTime: number) => void; timer: Timer } {
  const timer = new VirtualTimer(now)

  const tick = (elapsedTime: number) => timer.tick(elapsedTime)

  return { tick, timer }
}

type Timeslot = { time: number; tasks: Array<() => void> }

class VirtualTimer implements Timer {
  protected _now: number
  protected _timeslots: Array<Timeslot> = []

  constructor(now: number) {
    this._now = now
  }

  public now(): number {
    return this._now
  }

  public setTimer(task: () => void, delayTime: number): Disposable {
    const time = this._now + Math.max(0, delayTime)
    insertByTime(time, task, this._timeslots)

    return disposeWith(removeByTask(this._timeslots), { time, task })
  }

  public clearTimer(disposable: Disposable): void {
    disposable.dispose()
  }

  public tick(elapsedTime: number) {
    if (elapsedTime <= 0) return

    this._now += elapsedTime

    this.run()
  }

  private run() {
    const now = this.now()
    const timeslots = this._timeslots

    while (timeslots.length > 0 && timeslots[0].time <= now) {
      const { tasks } = timeslots.shift() as Timeslot

      for (const task of tasks) task()
    }
  }
}

function removeByTask(timeslots: Array<Timeslot>) {
  return function({ time, task }: { time: number; task: () => void }) {
    const index = binarySearch(time, timeslots)

    if (index >= 0 && index < timeslots.length) {
      const at = timeslots[index].tasks.indexOf(task)

      if (at >= 0) timeslots[index].tasks.splice(at, 1)
    }
  }
}

function insertByTime(time: number, task: () => void, timeslots: Array<Timeslot>) {
  const length = timeslots.length

  if (length === 0) return timeslots.push({ time, tasks: [task] })

  const index = binarySearch(time, timeslots)

  if (index >= length) {
    timeslots.push({ time, tasks: [task] })
  } else {
    insertAtTimeslot(task, timeslots, time, index)
  }
}

function binarySearch(time: number, timeslots: Array<Timeslot>): number {
  let low = 0
  let high = timeslots.length
  let mid
  let timeslot

  while (low < high) {
    mid = Math.floor((low + high) / 2)
    timeslot = timeslots[mid]

    if (time === timeslot.time) {
      return mid
    } else if (time < timeslot.time) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  return high
}

function insertAtTimeslot(
  task: () => void,
  timeslots: Array<Timeslot>,
  time: number,
  index: number
) {
  const timeslot = timeslots[index]

  if (time === timeslot.time) {
    timeslot.tasks.push(task)
  } else {
    timeslots.splice(index, 0, { time, tasks: [task] })
  }
}
