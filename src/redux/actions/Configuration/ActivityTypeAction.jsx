import * as constants from '../../constants';

export const fetchAllActivityType = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
				headers: constants.TOKEN,
        url: `${constants.RUTA}/activity-type`,
        success: (response) => (setAllActivityType(response))
    }
});

export const createActivityType = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/activity-type`,
        data,
        success: (activityType) => (addActivityType(activityType)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getActivityTypeById = (activityTypeId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/activity-type/${activityTypeId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateActivityTypeById = (activityTypeId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/activity-type/${activityTypeId}`,
        data,
        success: (activityTypeId, data) => (updateActivityType(activityTypeId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const updateStateActivityTypeById = (activityTypeId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/activity-type/state/${activityTypeId}`,
		success: (activityTypeId) => (updateStateActivityType(activityTypeId)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const deleteActivityTyperById = (activityTypeId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/activity-type/${activityTypeId}`,
        success: () => (removeActivityType(activityTypeId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setAllActivityType  = (data) => ({
    type: constants.SET_ALL_ACTIVITY_TYPE,
    payload: data
});

const addActivityType = (activityType) => ({
    type: constants.ADD_ACTIVITY_TYPE,
    payload: activityType
});

const updateActivityType = (activityTypeId, data) => ({
    type: constants.UPDATE_ACTIVITY_TYPE,
    payload: { activityTypeId, data }
});

const updateStateActivityType = (id) => ({
	type: constants.UPDATE_STATE_ACTIVITY_TYPE,
	payload: { id }
});

const removeActivityType = (activityTypeId) => ({
    type: constants.REMOVE_ACTIVITY_TYPE,
    payload: activityTypeId
});