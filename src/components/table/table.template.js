const CODES = {
	A: 65,
	Z: 90,
}

// создаёт ячейку таблицы
function toCell(row) {
	return function(_, col) {
		return `
			<div
				class="cell"
				data-type="resizeble"
				data-col="${col}"
				data-id="${row}:${col}"
				data-type="cell"
				contenteditable
			>111</div>
		`
	}
}

// создаёт колонку таблицы
function toColumn(col, index) {
	return `
		<div class="column" data-type="resizeble" data-col="${index}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

// создаёт структуру строчки таблицы
function createRow(index = ``, content) {
	const rowResize = index ? `<div class="row-resize" data-resize="row"></div>` : ``;
	return `
		<div class="row" data-type="resizeble" data-row="${index}">
			<div class="row-info">
				${index || ``}
				${rowResize}
			</div>
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
	for(let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
		const cells = new Array(colsCount)
			.fill(``)
			.map(toCell(rowIndex))
			.join(``)

		rows.push(createRow(rowIndex + 1, cells))
	}

	return rows.join(``)
}
