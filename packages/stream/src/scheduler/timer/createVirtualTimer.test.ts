import { TestCollection, describe, given, it } from '@typed/test'

import { createVirtualTimer } from './createVirtualTimer'

export const test: TestCollection = describe(`createVirtualTimer`, [
  given(`the time of origin`, [
    it(`returns a Timer and a tick function`, ({ equal }) => {
      const { tick, timer } = createVirtualTimer()

      equal('function', typeof tick)
      equal(0, timer.now())
    }),

    describe(`tick`, [
      given(`an elapsed time`, [
        it(`increments the return value of timer.now()`, ({ equal }) => {
          const { tick, timer } = createVirtualTimer()

          equal(0, timer.now())

          tick(100)

          equal(100, timer.now())
        }),
      ]),
    ]),

    describe(`timer`, [
      describe(`setTimer`, [
        given(`a task to run and a delayTime`, [
          it(`returns a disposable`, ({ equal }) => {
            const { timer } = createVirtualTimer()

            const disposable = timer.setTimer(() => {}, 100)

            equal('function', typeof disposable.dispose)
          }),
          it(`should be run after 'tick()' past the time`, ({ ok }) => {
            const { tick, timer } = createVirtualTimer()

            let called: boolean = false

            const task = () => {
              called = true
            }

            timer.setTimer(task, 10)

            tick(10)

            ok(called)
          }),
          it(`should not run task if not ticked past delayTime`, ({ notOk, ok }) => {
            const { tick, timer } = createVirtualTimer()

            let called: boolean = false

            const task = () => {
              called = true
            }

            timer.setTimer(task, 10)

            tick(5)

            notOk(called)

            tick(5)

            ok(called)
          }),
        ]),
      ]),

      describe(`clearTimer`, [
        given(`a disposable`, [
          it(`cancels the running of a given task`, ({ notOk }) => {
            const { tick, timer } = createVirtualTimer()

            let called: boolean = false

            const task = () => {
              called = true
            }

            const disposable = timer.setTimer(task, 5)

            timer.clearTimer(disposable)

            tick(10)

            notOk(called)
          }),
        ]),
      ]),
    ]),
  ]),
])
