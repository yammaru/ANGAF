import * as constants from '../../constants';

export const fetchAllAssessor = ( onSuccess, onError) => ({
    type: constants.API,
    payload: {
			method: 'GET',
			headers: constants.TOKEN,
			url: `${constants.RUTA}/assessor`,
			success: (response) => (setAllAssessor(response)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
    }
});

export const creatAssessor = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/assessor`,
        data,
        success: (assessor) => (addAssessor(assessor)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const fetchDataAssesorReport = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/report/assesors-report`,
        data,
        success: (assessor) => (assessorReport(assessor)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const fetchExcelAssesorReport = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/report/assesors-report-excel`,
        data,
        success: (assessor) => (assessorReport(assessor)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getAssessorById = (id, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/assessor/${id}`,
        postProcessSuccess: onSuccess
    }
});

export const updateAssessorById = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url:`${constants.RUTA}/assessor/${id}`,
        data,
        success: (id, data) => (updateAssessor(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteAssessorById = (id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
      method: 'DELETE',
      url: `${constants.RUTA}/assessor/${id}`,
      success: () => (removeAssessor( id)),
      postProcessSuccess: onSuccess,
      postProcessError: onError
    }
});

export const updateStateAdviserById = (adviserId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/assessor/state/${adviserId}`,
		success: (adviserId) => (updateStateAdviser(adviserId)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

const setAllAssessor = (data) => ({
    type: constants.SET_ALL_ASSESSOR,
    payload: data
});

const addAssessor = (assessor) => ({
    type: constants.ADD_ASSESSOR,
    payload: assessor
});

const assessorReport = (assessor) => ({
    type: constants.ASSESOR_REPORT,
    payload: assessor
});



const updateAssessor = (id, data) => ({
    type: constants.UPDATE_ASSESSOR,
    payload: { id, data }
});

const removeAssessor = ( id) => ({
    type: constants.REMOVE_ASSESSOR,
    payload:  id
});

const updateStateAdviser = (adviserId) => ({
	type: constants.UPDATE_STATE_ADVISER,
	payload: { adviserId }
});