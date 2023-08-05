import * as constants from '../../constants';

export default function auditType(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_AUDITS_TYPE:
            return action.payload;
        case constants.ADD_AUDITS_TYPE:
            return state.concat(action.payload);
        case constants.REMOVE_AUDITS_TYPE:
            return state.filter(item => item._id !== action.payload);
        case constants.UPDATE_AUDITS_TYPE:
            return state.map(item => {
                if (item._id === action.payload.auditTypeId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_AUDITS_TYPE:
            return [];
        default:
            return state;
    }
}