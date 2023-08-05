import * as constants from '../../constants';

export default function permission(state = [], action) {
	switch (action.type) {
		case constants.SET_ALL_PERMISSION:
			return action.payload;
		case constants.ADD_PERMISSION:
			return state.concat(action.payload);
		case constants.REMOVE_PERMISSION:
			return state.filter(item => item._id !== action.payload);
		case constants.UPDATE_PERMISSION:
			return state.map(item => {
				if (item._id === action.payload.permissionId)
					return {...item, ...action.payload.data};
				else
					return item;
			});
		case constants.RESET_PERMISSION:
			return [];
		case constants.SET_PERMISSION_BY_PROFILE:
			return action.payload
		
		case constants.SET_SAVE_PERMISSIONS_BY_PROFILE:
			return action.payload
		default:
			return state;
	}
}