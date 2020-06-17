import {ExcelComponent} from '@core/ExcelComponent'

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

	constructor($root) {
		super($root, {
			// обязательный параметр, имя компонента
			// для его идентификации в потоке/иеррахии
			name: `Formula`,
			// массив событий, которые нужно
			// прослушивать на данном компоненте
			listeners: [`input`, `click`],
		})
		this.$root = $root
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="true"></div>
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
		console.log(`onInput  Formula :: $root  ::  `, this.$root);
		console.log(`Formula: onInput -> evt :: `, evt.target.textContent.trim() )
	}

	// потом удалить
	onClick() {}
}
