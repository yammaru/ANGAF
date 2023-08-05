import * as constants from '../../constants';

export const createCoupon = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/coupon`,
		data,
		success: (coupon) => (addCoupon(coupon)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const updateCouponById = (couponId, data, onSuccess, onError) => ({
	type: constants.API,
    payload: {
			method: 'PUT',
			url: `${constants.RUTA}/coupon/${couponId}`,
			data,
			success: (couponId, data) => (updateCoupon(couponId, data)),
			postProcessSuccess: onSuccess,
			postProcessError: onError
    }
});

/*export const getCouponById = (couponId, onSuccess) => ({
    type: constants.API,
    payload: {
			method: 'GET',
			url: `${constants.RUTA}/coupon/${couponId}`,
			postProcessSuccess: onSuccess
    }
});*/

export const downloadCoupon = (couponId, onSuccess) => ({
    type: constants.API,
    payload: {
			method: 'GET',
			url: `${constants.RUTA}/coupon/downloadCoupon/${couponId}`,
			postProcessSuccess: onSuccess
    }
});



export const sendCoupon = (couponId, onSuccess) => ({
    type: constants.API,
    payload: {
		method: 'POST',
		url: `${constants.RUTA}/coupon/send-coupon/${couponId}`,
		postProcessSuccess: onSuccess
    }
});


export const deleteCoupon = (couponId, onSuccess) => ({
    type: constants.API,
    payload: {
			method: 'DELETE',
			url: `${constants.RUTA}/coupon/${couponId}`,
			postProcessSuccess: onSuccess
    }
});


export const getCodeCoupon = (onSuccess) => ({
    type: constants.API,
    payload: {
			method: 'GET',
			url: `${constants.RUTA}/coupon/get-code-coupon`,
			postProcessSuccess: onSuccess
    }
});


export const fetchAllCoupons = () => ({
    type: constants.API,
    payload: {
			method: 'GET',
			headers: constants.TOKEN,
			url: `${constants.RUTA}/coupon`,
			success: (response) => (getCoupons(response))
    }
});

export const filterCoupons = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/coupon/filter-coupons`,
		data,
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

export const filterExchangeCoupons = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'POST',
		url: `${constants.RUTA}/coupon2/`,
		data,
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});

/*const removeCoupon = (couponId) => ({
    type: constants.DELETE_COUPON,
    payload: couponId
});*/

const addCoupon = (customer) => ({
    type: constants.ADD_COUPON,
    payload: customer
});

const getCoupons=(coupons)=>({
	type: constants.GET_ALL_COUPON,
    payload: coupons
});

const updateCoupon = (couponId, data) => ({
    type: constants.UPDATE_COUPON,
    payload: { couponId, data }
});

/*const downloadPdfCoupon = (couponId, data) => ({
    type: constants.DOWNLOAD_COUPON,
    payload: { couponId, data }
});*/




