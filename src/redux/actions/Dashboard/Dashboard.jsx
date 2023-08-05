import * as constants from '../../constants';

export const CollectionManagementGet = (onSuccess, onError) => ({
	type: constants.API,
	payload:{
		method: 'GET',
		url: `${constants.RUTA}/dashboard/CollectionManagement`,
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	}
})