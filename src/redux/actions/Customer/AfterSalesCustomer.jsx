import * as constants from '../../constants';

export const requestPostSale = (saleId,data, onSuccess, onError) => ({
	type: constants.API,
	payload:{
		method: 'POST',
		url: `${constants.RUTA}/after_sales/${saleId}`,
		data,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	}
})

export const ActivityViewPrint = (customerId, onSuccess, onError) => ({
	type: constants.API,
	payload:{
		method: 'GET',
		url: `${constants.RUTA}/activity/get_pdf_activity/${customerId}`,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	}
})

export const deletePostSale = (saleId, onSuccess, onError) => ({
	type: constants.API,
	payload:{
		method: 'DELETE',
		url: `${constants.RUTA}/after_sales/${saleId}`,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	}
})

export const postSale = (saleId, onSuccess, onError) => ({
	type: constants.API,
	payload:{
		method: 'GET',
		url: `${constants.RUTA}/after_sales/${saleId}`,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	}
})

export const getSalesCustomer = (customerId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'GET',
		url: `${constants.RUTA}/after_sales/sales/${customerId}`,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	}
})

export const technicalDocument = (afterSale,data,onSuccess, onError) => ({
	type: constants.API,
	payload:{
		method: 'POST',
		url: `${constants.RUTA}/after_sales/technicalDocument/${afterSale}`,
		data,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	}
})

export const fulfilled = (afterSale,data,onSuccess, onError) => ({
	type: constants.API,
	payload:{
		method: 'POST',
		url: `${constants.RUTA}/after_sales/fulfilled/${afterSale}`,
		data,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	}
})