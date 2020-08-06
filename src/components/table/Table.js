import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, getSelectionIdList, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'


export class Table extends ExcelComponent {
	static className = `excel__table`

	constructor($root, options) {
		super($root, {
			listeners: [`mousedown`, `click`, `keydown`, `input`],
			...options,
		})
	}

	toHTML() {
		return createTable(25)
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()

		const cell = this.$root.find(`[data-id="0:0"]`)
		this.selectCell(cell)

		this.$on(`formula:done`, (data) => {
			this.selection.current.focus()
		})

		this.$on(`formula:input`, (data) => {
			this.selection.current.text(data)
		})
	}

	selectCell(cell) {
		this.selection.select(cell)
		this.$emit(`table:select`, cell)
	}

	onMousedown(evt) {
		const resizeType = shouldResize(evt)

		if(resizeType) {
			resizeHandler(this.$root, evt)
		}
	}

	onClick(evt) {
		const id = evt.target.dataset.id

		if(id) {
			const cell = this.$root.find(`[data-id="${id}"]`)

			if(evt.shiftKey) {
				const current = this.selection.current.id(`parsed`)
				const target = cell.id(`parsed`)

				const $cellList = getSelectionIdList(current, target)
					.map((id) => this.$root.find(`[data-id="${id}"]`))

				this.selection.selectGroup($cellList)
			} else {
				this.selection.select(cell)
				this.$emit(`table:input`, $(evt.target))
			}
		}
	}

	onKeydown(evt) {
		const keys = [
			`ArrowUp`,
			`ArrowDown`,
			`ArrowRight`,
			`ArrowLeft`,
			`Tab`,
			`Enter`,
			`Escape`,
		]

		const {key, shiftKey} = evt

		if(keys.includes(key) && !shiftKey) {
			evt.preventDefault()

			const id = this.selection.current.id(true)
			const $nextCell = this.$root.find(nextSelector(key, id))
			this.selectCell($nextCell)
		}
	}

	onInput(evt) {
		this.$emit(`table:input`, $(evt.target))
	}
}

/*
#resize

 Performance (1)
	301 msScripting
	3420 msRendering
	374 msPainting
	340 msSystem
	4382 msIdle
	8817 msTotal

 Performance (2)
	220 msScripting
	2322 msRendering
	264 msPainting
	345 msSystem
	5046 msIdle

 Performance (3)
	78 msScripting
	621 msRendering
	241 msPainting
	296 msSystem
*/
