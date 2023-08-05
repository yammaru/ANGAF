import * as constants from '../../constants';

export const fetchAllResource = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
				headers: constants.TOKEN,
        url: `${constants.RUTA}/resource`,
        success: (response) => (setAllResource(response))
    }
});

export const createResource = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/resource`,
        data,
        success: (resource) => (addResource(resource)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});


export const getResourceById = (resourceId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/resource/${resourceId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateResourceById = (resourceId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/resource/${resourceId}`,
        data,
        success: (resourceId, data) => (updateResource(resourceId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteResourceById = (resourceId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/resource/${resourceId}`,
        success: () => (removeResource(resourceId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setAllResource  = (data) => ({
    type: constants.SET_ALL_RESOURCE,
    payload: data
});

const addResource = (resource) => ({
    type: constants.ADD_RESOURCE,
    payload: resource
});

const updateResource = (resourceId, data) => ({
    type: constants.UPDATE_RESOURCE,
    payload: { resourceId, data }
});

const removeResource = (resourceId) => ({
    type: constants.REMOVE_RESOURCE,
    payload: resourceId
});