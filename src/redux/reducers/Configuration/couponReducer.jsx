

import * as constants from '../../constants';

export default function couponReducer(state = [], action) {
    switch (action.type) {
        case constants.DOWNLOAD_COUPON:
            return action._payload;
        case constants.GET_ALL_COUPON:
            return action.payload;
        case  constants.GET_CODE_COUPON:
            return action._payload;
        default:   
            return state;
    }
}