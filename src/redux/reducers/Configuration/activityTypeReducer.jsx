import * as constants from '../../constants';

export default function activityTypeReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_ACTIVITY_TYPE:
            return action.payload;
        case constants.ADD_ACTIVITY_TYPE:
            return state._payload.concat(action.payload);
        case constants.REMOVE_ACTIVITY_TYPE:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_ACTIVITY_TYPE:
            return state._payload.map(item => {
                if (item._id === action.payload.activityTypeId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_ACTIVITY_TYPE:
            return [];
		case constants.UPDATE_STATE_ACTIVITY_TYPE:
			return state._payload.filter(item => item._id !== action.payload);
        default:
            return state;
    }
}