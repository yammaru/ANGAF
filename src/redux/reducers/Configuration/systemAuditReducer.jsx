import * as constants from '../../constants';

export default function systemAudit(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_SYSTEM_AUDIT:
            return action.payload;
        case constants.ADD_SYSTEM_AUDIT:
            return state.concat(action.payload);
        case constants.REMOVE_SYSTEM_AUDIT:
            return state.filter(item => item._id !== action.payload);
        case constants.UPDATE_SYSTEM_AUDIT:
            return state.map(item => {
                if (item._id === action.payload.systemAuditId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_SYSTEM_AUDIT:
            return [];
        default:
            return state;
    }
}