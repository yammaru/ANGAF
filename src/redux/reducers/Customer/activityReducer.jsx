import * as constants from '../../constants';

export default function activity(state = [], action) {
	switch (action.type) {
		case constants.SET_ALL_CUSTOMER_ACTIVITY:
			return action.payload;
		case constants.ADD_CUSTOMER_ACTIVITY:
			let finalState = null;
			action?.payload?._payload ? finalState = [...state , action.payload._payload] : finalState = state;
			return finalState;
		case constants.UPDATE_CUSTOMER_ACTIVITY:
			return state._payload.map(item => {
				if (item._id === action.payload.activityId)
					return { ...item, ...action.payload.data };
				else
					return item;
			});
		default:
			return state;
	}
}