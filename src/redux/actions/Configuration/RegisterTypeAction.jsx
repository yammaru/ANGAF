import * as constants from '../../constants';

export const fetchAllRegisterType = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/register-type`,
        headers: constants.TOKEN,
        success: (response) => (setAllRegisterType(response))
    }
});

export const createRegisterType = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/register-type`,
        data,
        success: (registerType) => (addRegisterType(registerType)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getRegisterTypeById = (registerTypeId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/register-type/${registerTypeId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateRegisterTypeById = (registerTypeId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/register-type/${registerTypeId}`,
        data,
        success: (registerTypeId, data) => (updateRegisterType(registerTypeId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteRegisterTypeById = (registerTypeId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/register-type/${registerTypeId}`,
        success: () => (removeRegisterType(registerTypeId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const updateStateRegisterTypeById = (registerTypeId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/register-type/state/${registerTypeId}`,
		success: (registerTypeId) => (updateStateRegisterType(registerTypeId)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

const setAllRegisterType = (data) => ({
    type: constants.SET_ALL_REGISTER_TYPE,
    payload: data
});

const updateStateRegisterType = (registerTypeId) => ({
	type: constants.UPDATE_STATE_REGISTER_TYPE,
	payload: { registerTypeId }
});

const addRegisterType = (registerType) => ({
    type: constants.ADD_REGISTER_TYPE,
    payload: registerType
});

const updateRegisterType = (registerTypeId, data) => ({
    type: constants.UPDATE_REGISTER_TYPE,
    payload: { registerTypeId, data }
});

const removeRegisterType = (registerTypeId) => ({
    type: constants.REMOVE_REGISTER_TYPE,
    payload: registerTypeId
});