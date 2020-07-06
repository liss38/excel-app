import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize} from './table.functions'


export class Table extends ExcelComponent {
	static className = `excel__table`

	constructor($root) {
		super($root, {
			listeners: [`mousedown`],
		})
	}

	toHTML() {
		return createTable(25)
	}

	onMousedown(evt) {
		const resizeType = shouldResize(evt)

		if(resizeType) {
			resizeHandler(this.$root, evt)
		}
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
