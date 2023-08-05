import * as constants from '../../constants';

export default function caughtError(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_CAUGHT_ERROR:
            return action.payload;
        case constants.ADD_CAUGHT_ERROR:
            return state._payload.concat(action.payload);
        case constants.REMOVE_CAUGHT_ERROR:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_CAUGHT_ERROR:
            return state._payload.map(item => {
                if (item._id === action.payload.caughtErrorId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_CAUGHT_ERROR:
            return [];
        default:
            return state;
    }
}