import * as constants from '../../constants';

export default function channelReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_CHANNEL:
            return action.payload;
        case constants.ADD_CHANNEL:
				  return state._payload.concat(action.payload);
        case 'REMOVE_CHANNEL':
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_CHANNEL:
            return state._payload.map(item => {
                if (item._id === action.payload.attentionPlaceId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_CHANNEL:
          return [];
        default:
          return state;
    }
}