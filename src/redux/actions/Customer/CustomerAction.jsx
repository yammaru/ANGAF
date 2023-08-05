import * as constants from "../../constants";

export const fetchAllCustomer = () => ({
	type: constants.API,
	payload: {
		method: "GET",
		headers: constants.TOKEN,
		url: `${constants.RUTA}/customer`,
		success: (response) => setAllCustomer(response),
	},
});

export const fetchAllCustomerWithYourUnits = (onSuccess) => ({
	type: constants.API,
	payload: {
		method: "GET",
		headers: constants.TOKEN,
		url: `${constants.RUTA}/customer/all-customer-with-your-units`,
		success: (response) => setAllCustomer(response),
		postProcessSuccess: onSuccess,
	},
});

export const getInfoAccountStatus = (data,onSuccess) => ({
	type: constants.API,
	payload: {
		method: "POST",
		headers: constants.TOKEN,
		url: `${constants.RUTA}/customer/get-info-account-status`,data,
		success: (response) => setAllCustomer(response),
		postProcessSuccess: onSuccess,
	},
});

export const setFileCustomer = (id, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: `${constants.RUTA}/customer/attachments/${id}`,
		data,
		success: (customer) => addCustomer(customer),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const deleteFileCustomer = (id, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "DELETE",
		url: `${constants.RUTA}/customer/attachments/${id}`,
		success: (customer) => addCustomer(customer),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const createCustomer = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: `${constants.RUTA}/customer`,
		data,
		success: (customer) => addCustomer(customer),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const getCustomerById = (customerId, onSuccess) => ({
	type: constants.API,
	payload: {
		method: "GET",
		url: `${constants.RUTA}/customer/${customerId}`,
		postProcessSuccess: onSuccess,
	},
});
export const getCustomerByIdWithAssesor = (customerId, onSuccess) => ({
	type: constants.API,
	payload: {
		method: "GET",
		url: `${constants.RUTA}/customer/with-assesor/${customerId}`,
		postProcessSuccess: onSuccess,
	},
});

export const updateCustomerById = (customerId, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "PUT",
		url: `${constants.RUTA}/customer/${customerId}`,
		data,
		success: (customerId, data) => updateCustomer(customerId, data),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const updateStateCustomerById = (customerId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "PUT",
		url: `${constants.RUTA}/customer/state/${customerId}`,
		success: (customerId) => updateStateCustomer(customerId),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const setObservation = (saleId,data,onSuccess,onError) => ({
	type: constants.API,
	payload: {
		method: "PUT",
		url: `${constants.RUTA}/sales2/observation/${saleId}`,
		data,
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
})

export const reassignmentAssessorCustomerById = (customerId, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "PUT",
		url: `${constants.RUTA}/customer/reassignmentAssessor/${customerId}`,
		data,
		success: (customerId, data) =>
			reassignmentAssessorCustomer(customerId, data),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const createDirectCollection = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: `${constants.RUTA}/direct-collection`,
		data,
		success: (directCollection) => addDirectCollection(directCollection),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const deleteCustomerById = (customerId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "DELETE",
		url: `${constants.RUTA}/customer/${customerId}`,
		success: () => removeCustomer(customerId),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

const setAllCustomer = (data) => ({
	type: constants.SET_ALL_CUSTOMER,
	payload: data,
});

// const setCustomerUnits = (data) => ({
//     type: constants.SET_CUSTOMER_UNITS,
//     payload: data
// });

const addCustomer = (customer) => ({
	type: constants.ADD_CUSTOMER,
	payload: customer,
});

const addDirectCollection = (directColletion) => ({
	type: constants.ADD_DIRECT_COLLECTION,
	payload: directColletion,
});

const updateStateCustomer = (customerId) => ({
	type: constants.UPDATE_STATE_CUSTOMER,
	payload: { customerId },
});

const updateCustomer = (customerId, data) => ({
	type: constants.UPDATE_CUSTOMER,
	payload: { customerId, data },
});

const reassignmentAssessorCustomer = (customerId, data) => ({
	type: constants.REASSIGNMENT_ASESSOR_CUSTOMER,
	payload: { customerId, data },
});

const removeCustomer = (customerId) => ({
	type: constants.REMOVE_CUSTOMER,
	payload: customerId,
});
