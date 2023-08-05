import * as constants from '../../constants';

export const fetchAllChannel = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
				headers: constants.TOKEN,
        url: `${constants.RUTA}/channel`,
        success: (response) => (setAllChannel(response))
    }
});

export const createAllChannel = (data, onSuccess, onError) => ({
    
    type: constants.API,
    payload: {
        method: 'POST',
        url: `${constants.RUTA}/channel`,
        data,
        success: (channel) => (addChannel(channel)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
    
});

export const updateStateChannelById = (channelId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: 'PUT',
		url: `${constants.RUTA}/channel/state/${channelId}`,
		success: (channelId) => (updateStateChannel(channelId)),
		postProcessSuccess: onSuccess,
		postProcessError: onError
	}
});


export const getChannelById = (channelId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `${constants.RUTA}/channel/${channelId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateChannelById = (channelId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `${constants.RUTA}/channel/${channelId}`,
        data,
        success: (channelId, data) => (updateChannel(channelId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteChannelById = (channelId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `${constants.RUTA}/channel/${channelId}`,
        success: () => (removeChannel(channelId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const updateStateChannel = (channelId) => ({
	type: constants.UPDATE_STATE_CHANNEL,
	payload: { channelId }
});

const setAllChannel  = (data) => ({
    type: constants.SET_ALL_CHANNEL,
    payload: data
});

const addChannel = (channel) => ({
    type: constants.ADD_CHANNEL,
    payload: channel
});

const updateChannel = (channelId, data) => ({
    type: constants.UPDATE_CHANNEL,
    payload: { channelId, data }
});

const removeChannel = (channelId) => ({
    type: 'REMOVE_CHANNEL',
    payload: channelId
});