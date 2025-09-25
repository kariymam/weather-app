export const useGetElement = (elems: Element | Element[], arr?: number[] , index = [0]): Element[] => {

    let elements: Element[] = []
	let selected: Element[] = []

	const isArray = (elems: any): elems is Element[] => Array.isArray(elems)

	const isSolo = (elems: any): elems is Element => !Array.isArray(elems)

	if (isArray(elems)) {
		elements = [...elems]
	} else if (isSolo(elems)) {
		elements = [elems]
	}

	if (arr) {
		index = arr
	}

	elements.forEach(el => {
		for (let i in index){
			if (elements.indexOf(el) === index[i]) {
				selected.push(el)
			}
		}
	})

	return selected
}

