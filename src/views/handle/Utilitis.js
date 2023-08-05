
export const onPreview = async (file) => {
	let src = file.url;
	if (!src) {
		src = await new Promise(resolve => {
			const reader = new FileReader();
			reader.readAsDataURL(file.originFileObj);
			reader.onload = () => resolve(reader.result);
		});
	}
	const image = new Image();
	image.src = src;
	const imgWindow = window.open(src);
	imgWindow.document.write(image.outerHTML);
};

export const  monthDiff = (d1, d2) => {
	let months;
	months = (d2.getFullYear() - d1.getFullYear()) * 12;
	months -= d1.getMonth();
	months += d2.getMonth();
	return months <= 0 ? 0 : months;
}

export const getChangeDateState = (DateDeliver = null, dateConstruction = null, projectStates) => {

	let fecha_construccion = '';
	let fecha_fin = '';
	let hoy = new Date();
	let name = "";
	
	fecha_construccion = new Date(dateConstruction);
	fecha_fin = new Date(DateDeliver);
	if (hoy < fecha_construccion) {
		name = (projectStates.find(x => x.id === 1).name)
	}
	if (hoy > fecha_fin) {
		name = (projectStates.find(x => x.id === 3).name)
	}
	if (hoy >= fecha_construccion && hoy <= fecha_fin) {
		name = (projectStates.find(x => x.id === 2).name)
	}
	return name;
}