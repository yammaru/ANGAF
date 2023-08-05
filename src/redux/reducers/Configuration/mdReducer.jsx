import * as constants from '../../constants';

export default function Mmodule(state = [], action) {
	switch (action.type) {
		case constants.SET_ALL_MODULE:
			return action.payload;
		case constants.ADD_MODULE:
			return state._payload.concat(action.payload);
		case constants.REMOVE_MODULE:
			return state._payload.filter(item => item._id !== action.payload);
		case constants.UPDATE_MODULE:
			return state._payload.map(item => {
				if (item._id === action.payload.moduleId)
					return { ...item, ...action.payload.data };
				else
					return item;
			});
		case constants.UPDATE_STATE_MODULE:
			return state._payload.filter(item => item._id !== action.payload);
		case constants.RESET_MODULE:
			return [];
		default:
			return state;
	}
}