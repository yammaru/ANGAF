import * as constants from '../../constants';

export default function assessor(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_ASSESSOR:
            return action.payload;
        case constants.ADD_ASSESSOR:
            return state._payload?.concat(action.payload);
        case constants.REMOVE_ASSESSOR:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_ASSESSOR:
            return state._payload.map(item => {
                if (item._id === action.payload.assessorId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.UPDATE_STATE_ADVISER:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.RESET_ASSESSOR:
            return [];
        default:
            return state;
    }
}