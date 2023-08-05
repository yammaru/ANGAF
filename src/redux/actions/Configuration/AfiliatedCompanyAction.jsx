import * as constants from '../../constants';

export const fetchAllAfiliatedCompany = () => ({
	type: constants.API,
	payload: {
		method: 'GET',
		headers: constants.TOKEN,
		url: `${constants.RUTA}/affiliated-company`,
		success: (response) => (setAllAfiliatedCompany(response))
	}
});


export const creatAfiliatedCompany = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/affiliated-company`,
		data,
		success: (afillatedCompany) => (addAfiliatedCompany(afillatedCompany)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const getAfiliatedCompanyById = (id, onSuccess) => ({
	type: constants.API,
	payload: {
		method: 'GET',
		url: `${constants.RUTA}/affiliated-company/${id}`,
		postProcessSuccess: onSuccess
	}
});

export const updateAfiliatedCompanyById = (id, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/affiliated-company/${id}`,
		data,
		success: (id, data) => (updateAfiliatedCompany(id, data)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const updateStateAfiliatedCompanyById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/affiliated-company/state/${id}`,
		success: (id) => (updateStateAfiliatedCompany(id)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const deleteAfiliatedCompanyById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'DELETE',
		url: `${constants.RUTA}/affiliated-company/${id}`,
		success: () => (removeAfiliatedCompany(id)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

const setAllAfiliatedCompany = (data) => ({
	type: constants.SET_ALL_AFFILIATED_COMPANY,
	payload: data
});

const addAfiliatedCompany = (afillatedCompany) => ({
	type: constants.ADD_AFFILIATED_COMPANY,
	payload: afillatedCompany
});

const updateAfiliatedCompany = (id, data) => ({
	type: constants.UPDATE_AFFILIATED_COMPANY,
	payload: {id, data}
});

const removeAfiliatedCompany = (id) => ({
	type: constants.REMOVE_AFFILIATED_COMPANY,
	payload: id
});

const updateStateAfiliatedCompany = (id) => ({
	type: constants.UPDATE_STATE_AFFILIATED_COMPANY,
	payload: {id}
});