import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
	// поле `className` статическое,
	// почему статическое - потому что мы будем
	// иметь к нему доступ без создание инстанса класса,
	// т.е. другими словами в инстансе
	// нам это поле не понадобится,
	// поэтому определили его как
	// внутренне поле класса,
	// которое нужно ему только внутри него,
	// Formula.className
	static className = `excel__formula` // корневой класс для данного блока

	constructor($root, options) {
		super($root, {
			// обязательный параметр, имя компонента
			// для его идентификации в потоке/иеррахии
			name: `Formula`,
			// массив событий, которые нужно
			// прослушивать на данном компоненте
			listeners: [`input`, `keydown`, `input`],
			...options,
		})
		this.$root = $root
	}

	init() {
		super.init()

		this.$formula = this.$root.find(`#formula`)

		this.$on(`table:select`, ($cell) => {
			this.$formula.text($cell.text())
		})

		this.$on(`table:input`, ($cell) => {
			this.$formula.text($cell.text())
		})
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div id="formula" class="input" contenteditable spellcheck="true"></div>
		`
	}

	// "Конвенция"(договоренность) такая:
	// если в listener'ах передано какое-то событие,
	// то в компоненте должен быть метод-обработчик данного события,
	// при этом именование такого метода в camelCase
	// по маске префикс `on` + название события, например:
	// click -> onClick()
	// change -> onChange()
	// focus -> onFocus()
	// ...
	onInput(evt) {
		this.$emit(`formula:input`, $(evt.target).text())
	}

	onKeydown(evt) {
		// когда нажимаем `Enter` или `Tab` в формуле,
		// фокус должен переходить на выбранную ячейку в таблице
		if(evt.key === `Enter` || evt.key === `Tab`) {
			evt.preventDefault()

			this.$emit(`formula:done`)
		}
	}
}
