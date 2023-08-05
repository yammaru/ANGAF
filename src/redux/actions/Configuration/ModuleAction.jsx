import * as constants from '../../constants'


export const fetchAllModule = (onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
		headers: constants.TOKEN,
        url: `${constants.RUTA}/module`,
        success: (response) => (setAllModule(response)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
    }
});

export const creatModule = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/module`,
        data,
        success: (module) => (addModule(module)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getModuleById = (id, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url:`${constants.RUTA}/module/${id}`,
        postProcessSuccess: onSuccess
    }
});

export const updateModuleById = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/module/${id}`,
        data,
        success: (id, data) => (updateModule(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteModuleById = (id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/module/${id}`,
        success: () => (removeModule(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const updateStateModuleById = (moduleId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/module/state/${moduleId}`,
		success: (moduleId) => (updateStateModule(moduleId)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

const setAllModule = (data) => ({
    type: constants.SET_ALL_MODULE,
    payload: data
});

const addModule = (module) => ({
    type: constants.ADD_MODULE,
    payload: module
});

const updateModule = (id, data) => ({
    type: constants.UPDATE_MODULE,
    payload: {  id, data }
});

const removeModule = (id) => ({
    type: constants.REMOVE_MODULE,
    payload: {id}
});

const updateStateModule = (moduleId) => ({
	type: constants.UPDATE_STATE_MODULE,
	payload: { moduleId }
});