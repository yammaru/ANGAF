import * as constants from '../../constants';

export default function advertisingImage(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_ADVERTISING_IMAGE:
            return action.payload;
        case constants.ADD_ADVERTISING_IMAGE:
            return state._payload.concat(action.payload);
        case constants.REMOVE_ADVERTISING_IMAGE:
            return state._payload.filter(item => item._id !== action.payload);
        case constants.UPDATE_ADVERTISING_IMAGE:
					return getStateImageUpdated();
        case constants.RESET_ADVERTISING_IMAGE:
          return [];
        case constants.UPDATE_STATE_ADVERTISING_IMAGE:
          return state._payload.filter(item => item.id !== action.payload);
        default:
          return state;
    }

  function getStateImageUpdated() {
    const currentImagesState = state["_payload"];
    const newImagesState = [];
    currentImagesState.forEach((item) => {
      newImagesState.push(item);
    });
    return newImagesState.map(item => {
      if (item._id === action.payload.id)
        return { ...item, ...action.payload.data };
      else
        return item;
    });
  }
}