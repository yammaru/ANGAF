import * as constants from '../../constants';

export default function generalActivity(state = [], action) {
	switch (action.type) {
		case constants.SET_ALL_GENERAL_ACTIVITY:
			return action.payload._payload;
		case constants.ADD_GENERAL_ACTIVITY:
			return action.payload._payload;
		case constants.REMOVE_GENERAL_ACTIVITY:
			return action.payload._payload;
		case constants.UPDATE_GENERAL_ACTIVITY:
			return action.payload._payload;
		case constants.END_GENERAL_ACTIVITY:
			return action.payload._payload;
		case constants.RESET_GENERAL_ACTIVITY:
			return [];
		default:
			return state;
	}
}	