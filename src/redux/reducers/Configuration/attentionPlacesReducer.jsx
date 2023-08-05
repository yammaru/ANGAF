import * as constants from '../../constants';

export default function attentionPlacesReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_ATTENTION_PLACES:
            return action.payload;
        case constants.ADD_ATTENTION_PLACES:
          return state._payload.concat(action.payload);
        case constants.REMOVE_ATTENTION_PLACES:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_ATTENTION_PLACES:
            return state._payload.map(item => {
                if (item._id === action.payload.attentionPlaceId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.UPDATE_STATE_ATTENTION_PLACES:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.RESET_ATTENTION_PLACES:
          return [];
        default:
          return state;
    }
}