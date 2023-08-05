import * as constants from '../../constants';

export const fetchAllOccupation = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
				headers: constants.TOKEN,
        url: `${constants.RUTA}/occupation`,
        success: (response) => (setAllOccupation(response))
    }
});

export const createOccupation = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/occupation`,
        data,
        success: (occupation) => (addOccupation(occupation)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const updateStateOccupationById = (occupationid, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/occupation/state/${occupationid}`,
		success: (occupationid) => (updateStateOccupation(occupationid)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});


export const getOccupationById = (id, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/occupation/${id}`,
        postProcessSuccess: onSuccess
    }
});

export const updateOccupationById = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/occupation/${id}`,
        data,
        success: (id, data) => (updateOccupation(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteOccupationById = (id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/occupation/${id}`,
        success: () => (removeOccupation(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setAllOccupation  = (data) => ({
    type: constants.SET_ALL_OCCUPATION,
    payload: data
});

const addOccupation = (occupation) => ({
    type: constants.ADD_OCCUPATION,
    payload: occupation
});

const updateOccupation = (id, data) => ({
    type: constants.UPDATE_OCCUPATION,
    payload: { id, data }
});

const updateStateOccupation = (occupationid) => ({
	type: constants.UPDATE_STATE_OCCUPATION,
	payload: { occupationid }
});

const removeOccupation = (id) => ({
    type: constants.REMOVE_OCCUPATION,
    payload: id
});