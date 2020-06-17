const CODES = {
	A: 65,
	Z: 90,
}

// создаёт ячейку таблицы
function toCell() {
	// isSelected
	// <div class="cell  selected" contenteditable>cell</div>
	return `
		<div class="cell" contenteditable></div>
	`
}

// создаёт колонку таблицы
function toColumn(col) {
	return `
		<div class="column">${col}</div>
	`
}

// создаёт структуру строчки таблицы
function createRow(index = ``, content) {
	return `
		<div class="row">
			<div class="row-info">${index || ``}</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

// приводит какой-то элемент массива к символу
function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}


export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []
	const cols = new Array(colsCount)
		.fill(``)
		.map(toChar)
		.map(toColumn)
		.join(``)

	// титульная строка с названиями колонок
	rows.push(createRow(null, cols))

	// остальные строки с cell'ами
	for(let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill(``)
			.map(toCell)
			.join(``)

		rows.push(createRow(i + 1, cells))
	}

	return rows.join(``)
}
