import * as constants from "../../constants";

export const fetchAllUsers = () => ({
    type: constants.API,
    payload: {
      method: 'GET',
      url: `${constants.RUTA}/user`,
      success: (response) => (setAllUsers(response))
    }
});

export const fetchAllActivatedUsers = () => ({
	type: constants.API,
	payload: {
		method: 'GET',
		url: `${constants.RUTA}/user/fetch_users_activated`,
		success: (response) => (getAvaliableUsers(response))
	}
});

export const createUser = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: `${constants.RUTA}/user`,
		data,
		success: (user) => addUser(user),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const getUserById = (person_id, onSuccess) => ({
	type: constants.API,
	payload: {
		method: "GET",
		url: `${constants.RUTA}/user/${person_id}`,
		postProcessSuccess: onSuccess,
	},
});

export const updateUserById = (id, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "PUT",
		url: `${constants.RUTA}/user/${id}`,
		data,
		success: (id, data) => updateUser(id, data),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});
export const changePassword = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: `${constants.RUTA}/user/changePassword`,
		data,
		success: (data) => change_Password(data),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});
export const deleteUserById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "DELETE",
		url: `${constants.RUTA}/user/${id}`,
		success: () => removeUser(id),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const updateStateUserById = (userId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "PUT",
		url: `${constants.RUTA}/user/state/${userId}`,
		success: (userId) => updateStateUser(userId),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const getModulesUserById = (userId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "GET",
		url: `${constants.RUTA}/module/get_by_user/${userId}`,
		success: (response) => getModulesUser(response),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const savePermissionsLocalStorage = (userId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "GET",
		url: `${constants.RUTA}/permissions/get_by_user/${userId}`,
		success: (response) => setPermissionsLocalStorage(response),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

const addUser = (user) => ({
	type: constants.ADD_USER,
	payload: user,
});

const setAllUsers = (data) => ({
	type: constants.SET_ALL_USERS,
	payload: data,
});

const getAvaliableUsers = (data) => ({
	type: constants.GET_AVALIABLE_USERS,
	payload: data
});

const updateUser = ( id, data) => ({
    type: constants.UPDATE_USER,
    payload: { id, data }
});
const change_Password = (data) => ({
    type: constants.CHANGE_PASSWORD,
    payload: { data }
});
const removeUser = (id) => ({
	type: constants.REMOVE_USER,
	payload: id,
});

const updateStateUser = (userId) => ({
	type: constants.UPDATE_STATE_USER,
	payload: { userId },
});

const getModulesUser = (response) => {
	if (response._payload) {
		const modules = response._payload;
		localStorage.setItem("USER_MODULES", JSON.stringify(modules));
		return { type: constants.GET_MODULES_USER, payload: modules };
	} else {
		return { type: constants.GET_MODULES_USER, payload: [] };
	}
};

const setPermissionsLocalStorage = (data) => {
	if (data._payload) {
		const permissions = data._payload;
		localStorage.setItem("USER_PERMISSIONS", JSON.stringify(permissions));
		return { type: constants.SET_USER_PERMISSIONS, payload: permissions };
	} else {
		return { type: constants.SET_USER_PERMISSIONS, payload: [] };
	}
};
