import * as constants from '../../constants';

export const fetchAllAuditsType = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
				headers: constants.TOKEN,
        url: `${constants.RUTA}/audits-type`,
        success: (response) => (setAllAuditsType(response))
    }
});

export const creatAuditsType = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/audits-type`,
        data,
        success: (auditsType) => (addAuditsType(auditsType)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getAuditsTypeById = (auditsTypeId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/audits-type/${auditsTypeId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateAuditsTypeById = (auditsTypeId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/audits-type/${auditsTypeId}`,
        data,
        success: (auditsTypeId, data) => (updateAuditsType(auditsTypeId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteAuditsTypeById = (auditsTypeId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/audits-type/${auditsTypeId}`,
        success: () => (removeAuditsType(auditsTypeId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setAllAuditsType = (data) => ({
    type: constants.SET_ALL_AUDITS_TYPE,
    payload: data
});

const addAuditsType = (auditsType) => ({
    type: constants.ADD_AUDITS_TYPE,
    payload: auditsType
});

const updateAuditsType = (auditsTypeId, data) => ({
    type: constants.UPDATE_AUDITS_TYPE,
    payload: { auditsTypeId, data }
});

const removeAuditsType = (auditsTypeId) => ({
    type: constants.REMOVE_AUDITS_TYPE,
    payload: auditsTypeId
});