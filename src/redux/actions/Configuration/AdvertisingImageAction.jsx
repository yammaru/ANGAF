import * as constants from '../../constants';

export const fetchAllAdvertisingImage = () => ({
	type: constants.API,
	payload: {
		method: 'GET',
		headers: constants.TOKEN,
		url: `${constants.RUTA}/advertising-image`,
		success: (response) => (setAllAdvertisingImage(response))
	}
});

export const createAdvertisingImage = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/advertising-image`,
		data,
		success: (advertisingImage) => (addAdvertisingImage(advertisingImage)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const getAdvertisingImageById = (id, onSuccess) => ({
	type: constants.API,
	payload: {
		method: 'GET',
		url: `${constants.RUTA}/advertising-image/${id}`,
		postProcessSuccess: onSuccess
	}
});

export const updateAdvertisingImageById = (id, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/advertising-image/${id}`,
		data,
		success: (id, data) => (updateAdvertisingImage(id, data)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const updateStateAdvertisingImageById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url:`${constants.RUTA}/advertising-image/state/${id}`,
		success: (id) => (updateStateAdvertisingImage(id)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const deleteAdvertisingImageById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'DELETE',
		url: `${constants.RUTA}/advertising-image/${id}`,
		success: () => (removeAdvertisingImage(id)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

const setAllAdvertisingImage = (data) => ({
	type: constants.SET_ALL_ADVERTISING_IMAGE,
	payload: data
});

const addAdvertisingImage = (advertisingImage) => ({
	type: constants.ADD_ADVERTISING_IMAGE,
	payload: advertisingImage
});

const updateAdvertisingImage = (id, data) => ({
	type: constants.UPDATE_ADVERTISING_IMAGE,
	payload: {id, data}
});

const removeAdvertisingImage = (id) => ({
	type: constants.REMOVE_ADVERTISING_IMAGE,
	payload: id
});

const updateStateAdvertisingImage = (id) => ({
	type: constants.UPDATE_STATE_ADVERTISING_IMAGE,
	payload: {id}
});