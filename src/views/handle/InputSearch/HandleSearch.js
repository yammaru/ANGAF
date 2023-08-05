export const handleSearch = (value, data, properties) => {
	let filtered = data;

	if (value !== "" && (properties !== undefined || properties.length > 0)) {
		filtered = data.filter((item) => {
			return properties.reduce((acc, property) => {
				if (item?.[property] !== null) {
					return (
						acc ||
						item?.[property]
							.toString()
							.toLowerCase()
							.includes(value.toLowerCase())
					);
				} else {
					return acc;
				}
			}, false);
		});
	}

	return filtered;
};
export const nubeListaElementos = (valor) => (
	<p style={{ color: "#6A6963", fontFamily: "sans-serif" }}>
		<strong>Buscar por:</strong> <br />
		{valor.map((item, index) => (
			<span key={index}>
				{item}
				<br />
			</span>
		))}
	</p>
);
export const resetFilter = (data) => {
	let filtered = data;
	return filtered;
};

export const handleFilterButton = (data, array) => {
  
	let filtered = data;
	const arrayFilteredData = filterEmptyProperties(array);
	const { propertyNames, propertyValues } =
		separateKeysAndValues(arrayFilteredData,arrayFilteredData);

	if (data !== undefined) {
		filtered = data.filter((item) => {
			const matches = propertyNames.every((propertyName, index) => {
				const propertyValue = propertyValues[index];
				return (
					propertyValue === "" ||
					item[propertyName]
						?.toString()
						.toLowerCase()
						.includes(propertyValue.toLowerCase())
				);
			});

			return matches;
		});
	}

	return filtered;
};

function separateKeysAndValues(data) {
	const propertyNames = Object.keys(data);
	const propertyValues = Object.values(data);

	return { propertyNames, propertyValues };
}
function filterEmptyProperties(data) {
	const filteredData = {};

	for (const key in data) {
		if (data[key] !== "") {
			filteredData[key] = data[key];
		}
	}

	return filteredData;
}
