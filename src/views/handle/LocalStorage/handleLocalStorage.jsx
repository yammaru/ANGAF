export const handleDeleteElement = (id, talla) => {
	const storedElements = JSON.parse(localStorage.getItem("elements")) || [];
	const elementIndex = storedElements.findIndex(
		(item) => item.id === id && item.talla === talla
	);
	if (elementIndex !== -1) {
		storedElements.splice(elementIndex, 1);
		localStorage.setItem("elements", JSON.stringify(storedElements));
		console.log(`Elemento con id ${id} y talla ${talla} eliminado.`);
	} else {
		console.log(
			`No se encontró ningún elemento con id ${id} y talla ${talla}.`
		);
	}
	return { id, talla };
};
export const handleIncreaseElement = (record,dataSource) => {
	const updatedDataSource = dataSource.map((item) => {
		if (item.id === record.id && item.talla === record.talla) {
			return {
				...item,
				cantidad: item.cantidad + 1,
			};
		}
		return item;
	});
    localStorage.setItem('elements', JSON.stringify(updatedDataSource));
	return updatedDataSource;
};

export const handleDecreaseElement = (record,dataSource) => {
	const updatedDataSource = dataSource.map((item) => {
		if (item.id === record.id && item.talla === record.talla) {
			return {
				...item,
				cantidad: Math.max(item.cantidad - 1, 0),
			};
		}
		return item;
	});
    localStorage.setItem('elements', JSON.stringify(updatedDataSource));
    return updatedDataSource;
};
