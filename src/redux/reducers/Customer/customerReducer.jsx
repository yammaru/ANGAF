import * as constants from "../../constants";

export default function customer(state = [], action) {
	switch (action.type) {
		case constants.SET_ALL_CUSTOMER:
			return action.payload;
		case constants.ADD_CUSTOMER:
			return state;
		case constants.REMOVE_CUSTOMER:
			const newState = state._payload.filter(
				(item) => item.id !== action.payload
			);
			return { ...state, _payload: newState };
		case constants.UPDATE_CUSTOMER:
			return { ...state };
		case constants.UPDATE_STATE_CUSTOMER:
			return state._payload.filter((item) => item._id !== action.payload);
		case constants.REASSIGNMENT_ASESSOR_CUSTOMER:
			return state;
		case constants.RESET_CUSTOMER:
			return [];
		default:
			return state;
	}
}
