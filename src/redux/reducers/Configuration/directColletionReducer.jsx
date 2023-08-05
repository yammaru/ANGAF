import * as constants from '../../constants';

export default function directColletionReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_ALL_DIRECT_COLLECTION:
            return action.payload;
        
        default:
            return state;
    }
}