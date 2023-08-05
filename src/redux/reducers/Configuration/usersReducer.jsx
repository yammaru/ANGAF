    import * as constants from '../../constants';

    export default function usersReducer(state = [], action) {
        switch (action.type) {
            case constants.SET_ALL_USERS:
                return action.payload;
						case constants.GET_AVALIABLE_USERS:
								return action.payload;
            case constants.ADD_USER:
                return state;
            case constants.REMOVE_USER:
                return state._payload.filter(item => item.id !== action.payload);
            case constants.UPDATE_USER:
                return state._payload.map(item => {
                    if (item.id === action.payload.id)
                        return { ...item, ...action.payload.data };
                    else
                        return item;
                });
            case constants.UPDATE_STATE_USER:
                return state._payload.filter(item => item._id !== action.payload);
            case constants.GET_MODULES_USER:
                // return action.payload;
                return state;
            case constants.RESET_USER_INFO:
                return [];
            default:
                return state;
        }
    }