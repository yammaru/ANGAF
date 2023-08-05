import * as constants from '../../constants';

export default function interestCustomer(state = [], action) {
	switch (action.type) {
		case constants.UPDATE_CUSTOMER_INTEREST:
			return state._payload.map(item => {
				if (item._id === action.payload.customerId)
					return { ...item, ...action.payload.data };
				else
					return item;
			});
		default:
			return state;
	}
}