export class TableSelection {
	static cssNamespace = {
		'SELECTED': `selected`,
	}

	constructor() {
		this.group = []
		this.current = null
	}

	select($el) {
		// предварительно оичищаем все предыдущие выделенные ячейки
		this.clearSelected()

		this.group.push($el)
		this.current = $el

		$el
			.focus()
			.addClass(TableSelection.cssNamespace[`SELECTED`])
	}

	clearSelected() {
		this.group.forEach(($el) => $el.removeClass(TableSelection.cssNamespace[`SELECTED`]))
		this.group = []
	}

	selectGroup($group = []) {
		// предварительно оичищаем все предыдущие выделенные ячейки
		this.clearSelected()

		$group.forEach(($el) => {
			this.group.push($el)
			$el.addClass(TableSelection.cssNamespace[`SELECTED`])
		})
	}
}
