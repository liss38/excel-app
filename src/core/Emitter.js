export class Emitter {
	constructor() {
		this.listeners = {}
	}

	// dispatch, fire, trigger
	// Уведомляем слушателей, если они есть
	// event string format like `formula:done`
	// table.emit(`formula:done`, {a: 1})
	emit(event, ...args) {
		if(!Array.isArray(this.listeners[event])) {
			return false
		}

		this.listeners[event].forEach((listener) => listener(...args))

		return true // (?*) необязательно
	}

	// on, listen
	// Подписываемся на уведомления
	// Добавляем нового слушателя
	// formula.subscribe(`table:select`, () => {})
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(fn)

		return () => {
			this.listeners[event] =
				this.listeners[event].filter((listener) => listener !== fn)
		}
	}
}

// const emitter = new Emitter()
// const unsubMaxDone = emitter.subscribe(`max:done`, (data) => console.log(`Sub: `, data))

// setTimeout(() => {
// 	emitter.emit(`max:done`, `emit after 1000ms`)
// }, 1000)

// emitter.emit(`12334324`, 42)
// // emitter.emit(`max:done`, 42)
// // emitter.emit(`max:done`, 42)
// // emitter.emit(`max:done`, 42)

// setTimeout(() => {
// 	emitter.emit(`max:done`, `emit after 3000ms and unsubMaxDone()`)
// 	unsubMaxDone()
// }, 3000)

// setTimeout(() => {
// 	emitter.emit(`max:done`, `emit after 4000ms`)
// }, 4000)
