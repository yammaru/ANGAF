import * as constants from '../../constants';

export default function profileReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_PROFILE:
            return action.payload;
        case constants.ADD_PROFILE:
          return state._payload.concat(action.payload);
        case constants.REMOVE_PROFILE:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_PROFILE:
            return state._payload.map(item => {
                if (item._id === action.payload.id)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.UPDATE_STATE_PROFILE:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.RESET_CHANNEL:
          return [];
        default:
          return state;
    }
}