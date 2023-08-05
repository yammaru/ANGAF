import moment from "moment";

export const useCustomers = () => {
	const DTOSet = (values) => {
		return {
			name: values["name"],
			lastName: values["lastName"],
			gender: values["gender"],
			phone_number: values["phone"],
			address: values["direction"] || null,
			birthday: values["dateBirth"] !== undefined
				? values["dateBirth"].format("YYYY-MM-DD")
				: null,
			identification: values["identification"] || null,
			email: values["email"],
			identification_type: values["identificationType"] === undefined || values["identificationType"] === ""
				? null
				: values["identificationType"],
			occupation: values["occupation"] === undefined || values["occupation"] === ""
				? null
				: values["occupation"],
			register_type: values["typeRegister"] === undefined || values["typeRegister"] === ""
				? null
				: values["typeRegister"],
			children_number: values["sons"] || null,
			has_habeas_data: values["habeasData"] || false,
			state: values["state"],
			assesor_id: (JSON.parse(localStorage.getItem('USER_INFO'))).id
		}
	}
	const FillInTheForm = (customer) => {
		let fullName = customer.fullName.split('_')
		return {
			name: fullName[0],
			lastName: fullName[1],
			email: customer.email,
			identification: customer.identification,
			phone: customer.phoneNumber,
			occupation: isNaN(parseInt(customer.occupation))?"":parseInt(customer.occupation),
			typeRegister: isNaN(parseInt(customer.typeRegister))?"":parseInt(customer.typeRegister),
			age: isNaN(parseInt(customer.age))?"":customer.birthday==null?"":parseInt(customer.age),
			sons: parseInt(customer.sons),
			direction: customer.address,
			identificationType: isNaN(parseInt(customer.identificationType))?"":customer.identificationType,
			gender: customer.gender,
			dateBirth:  moment(customer.birthday).isValid()?moment(customer.birthday):undefined,
			habeasData: customer.habeasData,
			state: customer.state
		}
	}
	return {DTOSet,FillInTheForm}
}