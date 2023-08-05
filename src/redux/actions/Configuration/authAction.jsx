import * as constants from "../../constants";

export const loginUser = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: `${constants.RUTA}/login`,
		data,
		success: (response) => setUserInfo(response),
		postProcessSuccess: onSuccess,
		postProcessError: onError,
	},
});

export const logoutUser = () => {
	localStorage.clear();
	return { type: constants.RESET_USER_INFO };
};

const setUserInfo = (data) => {
	if (data._payload && typeof  data._payload == "string"){
		const parsedToken = JSON.parse(atob(data._payload.split(".")[1]));
		const userInfo = {
			id: parsedToken.user.id,
			profile: parsedToken.user.profile,
			name: parsedToken.user.name,
			token: data._payload,
			idProfile: parsedToken.user.id_profile,
			isLoggedIn: true,
		};
		localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
		return { type: constants.SET_USER_INFO, payload: userInfo };
	} else {
		return { type: constants.SET_USER_INFO, payload: "Error" };
	}
};
