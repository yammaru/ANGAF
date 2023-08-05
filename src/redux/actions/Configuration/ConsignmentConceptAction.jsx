import * as constants from '../../../redux/constants';

export const fetchAllConsignmentConcept = () => ({
	type: constants.API,
	payload: {
		method: 'GET',
		headers: constants.TOKEN,
		url: `${constants.RUTA}/consignment-concept`,
		success: (response) => (setAllConsignmentConcept(response))
	}
});


export const creatConsignmentConcept = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/consignment-concept`,
		data,
		success: (afillatedCompany) => (addConsignmentConcept(afillatedCompany)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const getConsignmentConceptById = (id, onSuccess) => ({
	type: constants.API,
	payload: {
		method: 'GET',
		url: `${constants.RUTA}/consignment-concept/${id}`,
		postProcessSuccess: onSuccess
	}
});

export const updateConsignmentConceptById = (id, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/consignment-concept/${id}`,
		data,
		success: (id, data) => (updateConsignmentConcept(id, data)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const updateStateConsignmentConceptById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/consignment-concept/state/${id}`,
		success: (id) => (updateStateConsignmentConcept(id)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const deleteConsignmentConceptById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'DELETE',
		url: `${constants.RUTA}/consignment-concept/${id}`,
		success: () => (removeConsignmentConcept(id)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

const setAllConsignmentConcept = (data) => ({
	type: constants.SET_ALL_CONSIGNMENT_CONCEPT,
	payload: data
});

const addConsignmentConcept = (afillatedCompany) => ({
	type: constants.ADD_CONSIGNMENT_CONCEPT,
	payload: afillatedCompany
});

const updateConsignmentConcept = (id, data) => ({
	type: constants.UPDATE_CONSIGNMENT_CONCEPT,
	payload: {id, data}
});

const removeConsignmentConcept = (id) => ({
	type: constants.REMOVE_CONSIGNMENT_CONCEPT,
	payload: id
});

const updateStateConsignmentConcept = (id) => ({
	type: constants.UPDATE_STATE_CONSIGNMENT_CONCEPT,
	payload: {id}
});