import {numberRange} from '../../core/utils'


export const shouldResize = (evt) => evt.target.dataset.resize
export const isCell = (evt) => evt.target.dataset.type === `cell`

export const getSelectionIdList = (current, target) => {
	const colsRange = numberRange(current.col, target.col)
	const rowsRange = numberRange(current.row, target.row)

	const idList = colsRange.reduce((acc, col) => {
		rowsRange.forEach((row) => acc.push(`${row}:${col}`))

		return acc
	}, [])

	return idList
}

export const nextSelector = (key, {row, col}) => {
	const MIN_VALUE = 0
	switch(key) {
		case `Enter`:
		case `ArrowDown`:
			row++
			break
		case `Tab`:
		case `ArrowRight`:
			col++
			break
		case `ArrowLeft`:
			col = (col - 1) < MIN_VALUE ? MIN_VALUE : (col - 1)
			break
		case `ArrowUp`:
			row = (row - 1) < MIN_VALUE ? MIN_VALUE : (row - 1)
			break
	}

	return `[data-id="${row}:${col}"]`
}
