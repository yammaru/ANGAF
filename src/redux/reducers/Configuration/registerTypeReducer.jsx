import * as constants from '../../constants';

export default function registerTypeReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_REGISTER_TYPE:
            return action.payload;
        case constants.ADD_REGISTER_TYPE:
            return state._payload.concat(action.payload);
        case constants.REMOVE_REGISTER_TYPE:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_REGISTER_TYPE:
            return state._payload.map(item => {
                if (item._id === action.payload.registerTypeId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_REGISTER_TYPE:
            return [];
        default:
            return state;
    }
}