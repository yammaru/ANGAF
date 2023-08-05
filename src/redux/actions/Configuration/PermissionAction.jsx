import * as constants from '../../constants';

export const fetchAllPermission = (onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'GET',
		headers: constants.TOKEN,
		url: `${constants.RUTA}/permissions`,
		success: (response) => (setAllPermission(response)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});
export const fetchProfilePermission = (profileId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'GET',
		headers: constants.TOKEN,
		url: `${constants.RUTA}/permissions/get_by_profile/${profileId}`,
		success: (response) => (setPermissionByProfileId(response)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const fetchSavePermissions = (profileId, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/permissions/save_permissions_of_profile/${profileId}`,
		data,
		success: (response) => (setSavePermissionsByProfileId(response)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});
export const createPermission = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/permissions`,
        data,
        success: (permission) => (addPermission(permission)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});
const addPermission = (permission) => ({
    type: constants.ADD_PERMISSION,
    payload: permission
});

const setAllPermission = (data) => ({
	type: constants.SET_ALL_PERMISSION,
	payload: data
});

const setPermissionByProfileId = (data) => ({
	type: constants.SET_PERMISSION_BY_PROFILE,
	payload: data
})

const setSavePermissionsByProfileId = (data) => ({
	type: constants.SET_SAVE_PERMISSIONS_BY_PROFILE,
	payload: data
})