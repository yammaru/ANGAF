import * as constants from '../../constants';

export const fetchAllAttentionPlaces = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
				headers: constants.TOKEN,
        url: `${constants.RUTA}/customer-service-place`,
        success: (response) => (setAllAttentionPlaces(response))
    }
});

export const createAttentionPlaces = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/customer-service-place`,
        data,
        success: (attentionPlaces) => (addAttentionPlaces(attentionPlaces)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});


export const getAttentionPlacesById = (id, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/customer-service-place/${id}`,
        postProcessSuccess: onSuccess
    }
});

export const updateAttentionPlacesById = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/customer-service-place/${id}`,
        data,
        success: (id, data) => (updateAttentionPlaces(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteAttentionPlacesById = (id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/customer-service-place/${id}`,
        success: () => (removeAttentionPlaces(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const updateStateAttentionPlacesById = (atentionPlacesId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/customer-service-place/state/${atentionPlacesId}`,
		success: (atentionPlacesId) => (updateStateAttentionPlaces(atentionPlacesId)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

const setAllAttentionPlaces  = (data) => ({
    type: constants.SET_ALL_ATTENTION_PLACES,
    payload: data
});

const addAttentionPlaces = (attentionPlaces) => ({
    type: constants.ADD_ATTENTION_PLACES,
    payload: attentionPlaces
});

const updateAttentionPlaces = (id, data) => ({
    type: constants.UPDATE_ATTENTION_PLACES,
    payload: { id, data }
});

const removeAttentionPlaces = (id) => ({
    type: constants.REMOVE_ATTENTION_PLACES,
    payload: id
});

const updateStateAttentionPlaces = (atentionPlacesId) => ({
	type: constants.UPDATE_STATE_ATTENTION_PLACES,
	payload: { atentionPlacesId }
});