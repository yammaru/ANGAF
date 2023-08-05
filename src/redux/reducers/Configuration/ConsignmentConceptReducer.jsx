import * as constants from '../../constants';

export default function ConsignmentConceptReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_CONSIGNMENT_CONCEPT:
            return action.payload;
        case constants.ADD_CONSIGNMENT_CONCEPT:
            return state._payload.concat(action.payload);
        case constants.REMOVE_CONSIGNMENT_CONCEPT:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_CONSIGNMENT_CONCEPT:
            return state._payload.map(item => {
                if (item._id === action.payload.afilitedCompanyId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_CONSIGNMENT_CONCEPT:
            return [];
        case constants.UPDATE_STATE_CONSIGNMENT_CONCEPT:
          return state._payload.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}