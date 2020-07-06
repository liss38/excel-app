// специальная утилита,
// которая позволяет проще
// взаимодействовать с
// dom-деревом;
// автоматизация работы с dom-деревом
// в стиле jQuery

class Dom {
	constructor(selector) {
		// для селектора два разных кейса:
		// (1) когда строка `#app .class-name tag`
		// (2) когда передана dom-нода

		this.$el = typeof selector === `string`
			? document.querySelector(selector)
			: selector
	}

	html(html) {
		// два кейса
		// (1) могут быть как геттер и сеттер,
		// т.е. если ничего не передаём - геттер
		// если что-то передали - сеттер
		// (2) если сеттер, то возвращает инстанс с результатом

		// если передана строка(с html'ем),
		// то встраиваем эту строку в элемент
		if(typeof html === `string`) {
			this.$el.innerHTML = html;

			// чтобы вполнялся вызов методов по цепочке, чейн
			return this
		}

		// возвращаем содержимое элемента
		return this.$el.outerHTML.trim()
	}

	clear() {
		// очистить содержимое
		this.html(``)
		return this
	}

	append(node) {
		if(node instanceof Dom) node = node.$el

		if(Element.prototype.append) {
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}

		return this
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback)
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback)
	}

	closest(selector) {
		return $(this.$el.closest(selector)) // $(...) because instanceof Dom
	}

	getCoords() {
		return this.$el.getBoundingClientRect()
	}

	get data() {
		return this.$el.dataset
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}

	css(styles = {}) {
		Object.keys(styles).forEach( (styleName) => this.$el.style[styleName] = styles[styleName])

		return this
	}
}

export function $(selector) {
	return new Dom(selector)
}

$.create = (tagName, classes = ``) => {
	const el = document.createElement(tagName)

	if(classes) {
		el.classList.add(classes)
	}

	return $(el)
}
