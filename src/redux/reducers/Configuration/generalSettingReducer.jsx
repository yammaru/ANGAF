import * as constants from '../../constants';

export default function generalSetting(state = [], action) {
  switch (action.type) {
    case constants.SET_ALL_GENERAL_SETTING:
      return action.payload;
    case constants.ADD_GENERAL_SETTING:
      return state._payload;
    case constants.RESET_GENERAL_SETTING:
      return [];
    default:
      return state;
  }
}