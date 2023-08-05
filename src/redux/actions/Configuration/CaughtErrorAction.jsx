import * as constants from '../../constants';

export const fetchAllCaughtErrorAction = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/caught-error`,
				headers: constants.TOKEN,
        success: (response) => (setAllCaughtErrorAction(response))
    }
});

export const creatCaughtErrorAction = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/caught-error`,
        data,
        success: (caughtErrorAction) => (addCaughtErrorAction(caughtErrorAction)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getCaughtErrorActionById = (caughtErrorActionId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/caught-error/${caughtErrorActionId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateCaughtErrorActionById = (caughtErrorActionId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/caught-error/${caughtErrorActionId}`,
        data,
        success: (caughtErrorActionId, data) => (updateCaughtErrorAction(caughtErrorActionId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteCaughtErrorActionById = (caughtErrorActionId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/Auditcaught-error/${caughtErrorActionId}`,
        success: () => (removeCaughtErrorAction(caughtErrorActionId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setAllCaughtErrorAction = (data) => ({
    type: constants.SET_ALL_CAUGHT_ERROR,
    payload: data
});

const addCaughtErrorAction = (caughtErrorAction) => ({
    type: constants.ADD_CAUGHT_ERROR,
    payload: caughtErrorAction
});

const updateCaughtErrorAction = (caughtErrorActionId, data) => ({
    type: constants.UPDATE_CAUGHT_ERROR,
    payload: { caughtErrorActionId, data }
});

const removeCaughtErrorAction = (caughtErrorActionId) => ({
    type: constants.REMOVE_CAUGHT_ERROR,
    payload: caughtErrorActionId
});