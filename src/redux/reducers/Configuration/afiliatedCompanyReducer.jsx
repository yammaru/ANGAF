import * as constants from '../../constants';

export default function afiliatedCompanyReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_AFFILIATED_COMPANY:
            return action.payload;
        case constants.ADD_AFFILIATED_COMPANY:
            return state._payload.concat(action.payload);
        case constants.REMOVE_AFFILIATED_COMPANY:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_AFFILIATED_COMPANY:
            return state._payload.map(item => {
                if (item._id === action.payload.afilitedCompanyId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_AFFILIATED_COMPANY:
            return [];
        case constants.UPDATE_STATE_AFFILIATED_COMPANY:
          return state._payload.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}