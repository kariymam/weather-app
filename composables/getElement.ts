export const useGetElement = (elems: HTMLDivElement | HTMLDivElement[], arr?: number[] , index = [0]): HTMLDivElement[] => {

      let elements: HTMLDivElement[] = []
		let selected: HTMLDivElement[] = []

		const isArray = (elems: any): elems is HTMLDivElement[] => Array.isArray(elems)

		const isSolo = (elems: any): elems is HTMLDivElement => !Array.isArray(elems)

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

