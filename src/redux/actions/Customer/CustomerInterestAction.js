import * as constants from '../../constants';

export const updateCustomerInterestById  =  (customerId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
		method: 'PUT',
		url: `${constants.RUTA}/customer/interests/${customerId}`,
		data,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
    }
});