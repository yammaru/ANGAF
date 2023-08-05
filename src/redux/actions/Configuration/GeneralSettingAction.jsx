import * as constants from '../../constants';

export const fetchAllGeneralSetting = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
				headers: constants.TOKEN,
        url: `${constants.RUTA}/general-setting/`+JSON.parse(localStorage.USER_INFO).id,
        success: (response) => (setAllGeneralSetting(response))
    }
});



export const createGeneralSetting = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
      method: 'POST',
      url: `${constants.RUTA}/general-setting`,
      data,
      success: () => (addGeneralSetting(data)),
      postProcessSuccess: onSuccess,
      postProcessError: onError
    }
});

const setAllGeneralSetting = (data) => ({
    type: constants.SET_ALL_GENERAL_SETTING,
    payload: data
});

const addGeneralSetting = (generalSetting) => ({
    type: constants.ADD_GENERAL_SETTING,
    payload: generalSetting
});
