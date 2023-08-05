import * as constants from '../../constants';

export default function projectsClassificationReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_PROJECTS_CLASSIFICATION:
            return action.payload;
        case constants.ADD_PROJECTS_CLASSIFICATION:
            return state._payload.concat(action.payload);
        case constants.REMOVE_PROJECTS_CLASSIFICATION:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_PROJECTS_CLASSIFICATION:
            return state._payload.map(item => {
                if (item._id === action.payload.afilitedCompanyId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_PROJECTS_CLASSIFICATION:
            return [];
        case constants.UPDATE_STATE_PROJECTS_CLASSIFICATION:
          return state._payload.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}