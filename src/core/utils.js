export function capitalize(string) {
	if(typeof string !== `string`) {
		return ``
	}

	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function numberRange(start, end) {
	if(end < start) {
		[end, start] = [start, end]
	}

	return new Array(end - start + 1)
		.fill(``)
		.map((_, index) => index + start)
}
