import * as constants from '../../constants';
import LocalStorage from '../../../views/config/LocalStorage'

let Storage = new LocalStorage();

export const fetchAllProfile = () => ({
    type: constants.API,
    payload: {
			method: 'GET',
			headers: { 'Authorization':Storage.getToken() },
			url: `${constants.RUTA}/profile`,
			success: (response) => (setAllProfile(response))
    }
});

export const createAllProfile = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/profile`,
        data,
        success: (profile) => (addProfile(profile)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const updateStateProfileById = (profileId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/profile/state/${profileId}`,
		success: (profileId) => (updateStateProfile(profileId)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const getProfileById = (id, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/profile/${id}`,
        postProcessSuccess: onSuccess
    }
});

export const updateProfileById = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/profile/${id}`,
        data,
        success: (id, data) => (updateProfile(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteProfileById = (id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/profile/${id}`,
        success: () => (removeProfile(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setAllProfile  = (data) => ({
    type: constants.SET_ALL_PROFILE,
    payload: data
});

const addProfile = (profile) => ({
    type: constants.ADD_PROFILE,
    payload: profile
});

const updateProfile = (id, data) => ({
    type: constants.UPDATE_PROFILE,
    payload: { id, data }
});

const removeProfile = (id) => ({
    type: constants.REMOVE_PROFILE,
    payload: id
});

const updateStateProfile = (profileId) => ({
	type: constants.UPDATE_STATE_PROFILE,
	payload: { profileId }
});