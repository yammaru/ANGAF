import * as constants from '../../constants';

export const fetchAllSystemAudit = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/system-audit`,
				headers: constants.TOKEN,
        success: (response) => (setAllSystemAudit(response))
    }
});

export const createSystemAudit = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/system-audit`,
        data,
        success: (systemAudit) => (addSystemAudit(systemAudit)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getSystemAuditById = (systemAuditId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/system-audit/${systemAuditId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateSystemAuditById = (systemAuditId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/system-audit/${systemAuditId}`,
        data,
        success: (systemAuditId, data) => (updateSystemAudit(systemAuditId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteSystemAuditById = (systemAuditId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/system-audit/${systemAuditId}`,
        success: () => (removeSystemAudit(systemAuditId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setAllSystemAudit  = (data) => ({
    type: constants.SET_ALL_SYSTEM_AUDIT,
    payload: data
});

const addSystemAudit = (systemAudit) => ({
    type: constants.ADD_SYSTEM_AUDIT,
    payload: systemAudit
});

const updateSystemAudit = (systemAuditId, data) => ({
    type: constants.UPDATE_SYSTEM_AUDIT,
    payload: { systemAuditId, data }
});

const removeSystemAudit = (systemAuditId) => ({
    type: constants.REMOVE_SYSTEM_AUDIT,
    payload: systemAuditId
});