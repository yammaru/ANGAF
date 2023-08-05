
export const dateFormat = 'YYYY/MM/DD';

export const captureDateBirth = (form,date,setDateBirth) => {
	if (date != null) {
		setDateBirth(date.format(dateFormat));
		onAgeChange(form,getAgeOfDate(date));
	}
}

export const captureDate = (date,setDate) => {
	if (date != null) {
		setDate(date.format(dateFormat));
	}
}

const onAgeChange = (form,date) => {
	form.setFieldsValue({
		age: date,
	});
};

export const getAgeOfDate = (fecha) => {
	let actuallyDate = new Date();
	let dateBirth = new Date(fecha);
	let age = actuallyDate.getFullYear() - dateBirth.getFullYear();
	let month = actuallyDate.getMonth() - dateBirth.getMonth();
	if (month < 0 || (month === 0 && actuallyDate.getDate() < dateBirth.getDate())) {
		age--;
	}
	return age;
}


export const validateAgeCustomer = (date) => {
	if(date != null ){
		let age = getAgeOfDate(date);
		let message = 'Debe ser mayor de edad';
		return age >= 18 ? Promise.resolve() : Promise.reject(new Error(message));
	}
}

export const validateDateGreaterThanCurrentDate = (date) => {
	let selectedDate = new Date(date);
	let actuallyDate = new Date();
	if(date != null ){
		let message = 'La fecha debe ser mayor a la actual';
		if(selectedDate > actuallyDate){
			return Promise.resolve();
		}
		return Promise.reject(new Error(message));
	}
}

export const getFormatDate = (date) => {
	const formatDate = Date.parse(date);
	let dt = new Date(formatDate);
	dt = dt.getDate()+ "/"+(dt.getMonth()+1)+"/"+dt.getFullYear();
	return dt;
}