import * as constants from '../../constants';

export default function occupationReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_OCCUPATION:
            return action.payload;
        case constants.ADD_OCCUPATION:
            return state._payload.concat(action.payload);
        case constants.REMOVE_OCCUPATION:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_OCCUPATION:
            return state._payload.map(item => {
                if (item._id === action.payload.occupationId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_OCCUPATION:
            return [];
        default:
            return state;
    }
}