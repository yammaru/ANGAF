import * as constants from '../../constants';

export default function resource(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_RESOURCE:
            return action.payload;
        case constants.ADD_RESOURCE:
            return state.concat(action.payload);
        case constants.REMOVE_RESOURCE:
            return state.filter(item => item._id !== action.payload);
        case constants.UPDATE_RESOURCE:
            return state.map(item => {
                if (item._id === action.payload.resourceId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_RESOURCE:
            return [];
        default:
            return state;
    }
}