import * as constants from '../../constants';

export const fetchAllPricesRange = (onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
				headers: constants.TOKEN,
        url: `${constants.RUTA}/price-range`,
        success: (response) => (setAllPricesRange(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const createPricesRange = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/price-range`,
        data,
        success: (pricesRange) => (addPricesRange(pricesRange)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const CreateByName = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/price-range/name`,
        data,
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});


export const getPricesRangeById = (pricesRangeId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/price-range/${pricesRangeId}`,
        postProcessSuccess: onSuccess
    }
});

export const fetchAllPricesRangeActivated = (onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'GET',
		headers: constants.TOKEN,
		url: `${constants.RUTA}/price-range/activated`,
		success: (response) => (setAllPricesRangeActivated(response)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const changeSateById = (pricesRangeId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/price-range/state/${pricesRangeId}`,
        postProcessSuccess: onSuccess
    }
});

export const updatePricesRangeById = (pricesRangeId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/price-range/${pricesRangeId}`,
        data,
        success: (pricesRangeId, data) => (updatePricesRange(pricesRangeId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deletePricesRangeById = (pricesRangeId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/price-range/${pricesRangeId}`,
        success: () => (removePricesRange(pricesRangeId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setAllPricesRange  = (data) => ({
    type: constants.SET_ALL_PRICES_RANGE,
    payload: data
});

const setAllPricesRangeActivated  = (data) => ({
	type: constants.SET_ALL_PRICES_RANGE_ACTIVATED,
	payload: data
});

const addPricesRange = (pricesRange) => ({
    type: constants.ADD_PRICES_RANGE,
    payload: pricesRange
});

const updatePricesRange = (pricesRangeId, data) => ({
    type: constants.UPDATE_PRICES_RANGE,
    payload: { pricesRangeId, data }
});

const removePricesRange = (pricesRangeId) => ({
    type: constants.REMOVE_PRICES_RANGE,
    payload: pricesRangeId
});