import * as constants from '../../../redux/constants';

export const fetchAllProjectsClassification = () => ({
	type: constants.API,
	payload: {
		method: 'GET',
		headers: constants.TOKEN,
		url: `${constants.RUTA}/projects-classification`,
		success: (response) => (setAllProjectsClassification(response))
	}
});


export const creatProjectsClassification = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/projects-classification`,
		data,
		success: (afillatedCompany) => (addProjectsClassification(afillatedCompany)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const getProjectsClassificationById = (id, onSuccess) => ({
	type: constants.API,
	payload: {
		method: 'GET',
		url: `${constants.RUTA}/projects-classification/${id}`,
		postProcessSuccess: onSuccess
	}
});

export const updateProjectsClassificationById = (id, data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/projects-classification/${id}`,
		data,
		success: (id, data) => (updateProjectsClassification(id, data)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const updateStateProjectsClassificationById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/projects-classification/state/${id}`,
		success: (id) => (updateStateProjectsClassification(id)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const deleteProjectsClassificationById = (id, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'DELETE',
		url: `${constants.RUTA}/projects-classification/${id}`,
		success: () => (removeProjectsClassification(id)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

const setAllProjectsClassification = (data) => ({
	type: constants.SET_ALL_PROJECTS_CLASSIFICATION,
	payload: data
});

const addProjectsClassification = (afillatedCompany) => ({
	type: constants.ADD_PROJECTS_CLASSIFICATION,
	payload: afillatedCompany
});

const updateProjectsClassification = (id, data) => ({
	type: constants.UPDATE_PROJECTS_CLASSIFICATION,
	payload: {id, data}
});

const removeProjectsClassification = (id) => ({
	type: constants.REMOVE_PROJECTS_CLASSIFICATION,
	payload: id
});

const updateStateProjectsClassification = (id) => ({
	type: constants.UPDATE_STATE_PROJECTS_CLASSIFICATION,
	payload: {id}
});