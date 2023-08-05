import * as constants from '../../constants';

export default function pricesRange(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_PRICES_RANGE:
            return action.payload;
		case constants.SET_ALL_PRICES_RANGE_ACTIVATED:
			return action.payload;
        case constants.ADD_PRICES_RANGE:
            return state._payload.concat(action.payload);
        case constants.REMOVE_PRICES_RANGE:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_PRICES_RANGE:
            return state._payload.map(item => {
                if (item._id === action.payload.pricesRangeId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_PRICES_RANGE:
            return [];
        default:
            return state;
    }
}