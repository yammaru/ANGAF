import * as constants from '../../constants';

export const fetchAllCustomerActivity = (onSuccess, onError) => ({
    type: constants.API,
    payload: {
		method: 'GET',
		headers: constants.TOKEN,
		url: `${constants.RUTA}/dashboard/activities`,
		postProcessSuccess: onSuccess,
		postProcessError: onError
    }
});

export const createCustomerActivity = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/activity`,
		data,
		success: (activity) => (addCustomerActivity(activity)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const updateCustomerActivityById = (activityId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
			method: 'PUT',
			url: `${constants.RUTA}/activity/${activityId}`,
			data,
			success: (activityId, data) => (updateCustomerActivity(activityId, data)),
			postProcessSuccess: onSuccess,
			postProcessError: onError
    }
});



const setAllCustomerActivity = (data) => ({
    type: constants.SET_ALL_CUSTOMER_ACTIVITY,
    payload: data
});

const addCustomerActivity = (activity) => ({
    type: constants.ADD_CUSTOMER_ACTIVITY,
    payload: activity
});

const updateCustomerActivity = (activityId, data) => ({
    type: constants.UPDATE_CUSTOMER_ACTIVITY,
    payload: { activityId, data }
});
