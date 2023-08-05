import { useState} from 'react';

export const useUpdateCustomers = (customer) => {
	let datas = customer.name.split('_');
	let names = datas[0];
	let lastNames = datas[1];

	const birthdayConverted = Date.parse(customer.birthday);
	let date = new Date(birthdayConverted);
	const formattedBirthdate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

	const [identification_type, setIdentificationType] = useState(customer.identification_type);
	const [identification, setIdentification] = useState(customer.identification);
	const [gender, setGender] = useState(customer.gender);
	const [name, setName] = useState(names);
	const [lastName, setLastName] = useState(lastNames);
	const [birthday, setDateBirth] = useState(formattedBirthdate);
	const [address, setDirection] = useState(customer.address);
	const [children_number, setSons] = useState(customer.children_number);
	const [email, setEmail] = useState(customer.email);
	const [phone_number, setPhone] = useState(customer.phone_number);
	const [occupation, setOccupation] = useState(customer?.occupation_id);
	const [register_type, setTypeRegister] = useState(customer?.register_type_id);
	const [state, setState] = useState(customer.state);
	const [has_habeas_data, setData] = useState(customer.has_habeas_data);


	return {
		identification_type, setIdentificationType,
		identification, setIdentification,
		gender, setGender,
		name, setName,
		lastName, setLastName,
		birthday, setDateBirth,
		address, setDirection,
		children_number, setSons,
		email, setEmail,
		phone_number, setPhone,
		occupation, setOccupation,
		register_type, setTypeRegister,
		state, setState,
		has_habeas_data, setData,
	};
}

