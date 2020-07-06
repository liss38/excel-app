import {$} from '@core/dom'


export function resizeHandler($root, evt) {
	const $resizer = $(evt.target)
	const $parent = $resizer.closest(`[data-type="resizeble"]`)
	const coords = $parent.getCoords()
	const resizeType = evt.target.dataset.resize

	if(resizeType === `col`) {
		$resizer.css({opacity: 1, height: `100vh`})
	}
	if(resizeType === `row`) {
		$resizer.css({opacity: 1, width: `100vw`})
	}

	// список клеток данной колонки
	const colIndex = $parent.data.col
	const cells = $root.findAll(`[data-type="resizeble"][data-col="${colIndex}"]`)

	let value = 0;

	document.onmousemove = (e) => {
		// ресайз колонок
		if(resizeType === `col`) {
			const delta = e.pageX - coords.right
			value = coords.width + delta
			$parent.css({width: `${value}px`})
		}

		// ресайз строк
		if(resizeType === `row`) {
			const delta = e.pageY - coords.bottom
			value = coords.height + delta
			$parent.css({height: `${value}px`, borderBottom: `2px solid blue`})
		}
	}

	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null

		if(resizeType === `col`) {
			cells.forEach( (col) => {
				col.style.width = `${value}px`
			})
		}

		if(resizeType === `row`) {
			$parent.css({borderBottom: null})
		}

		$resizer.css({
			opacity: null,
			width: null,
			height: null,
		})
	}
}
