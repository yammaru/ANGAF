import axios from "axios";

import * as constants from "./constants";
import {logoutUser} from "./actions/Configuration/authAction";
import {errorGlobal, warning} from "../views/handle/Notification/Notification";
import {convertAllMapDataState} from "../views/handle/HandleFilterTable/handleFilterTable";

export const apiMiddleware =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		if (action.type !== constants.API) return next(action);
		const BASE_URL = constants.RUTA_API;
		const AUTH_TOKEN = getState().user.token;
		if (AUTH_TOKEN){
			axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
			axios.defaults.headers.common["X-Forwarded-For"] = localStorage.IP;
			let objJsonStr = localStorage.clientLocation;
			axios.defaults.headers.common["ClientLocation"] = Buffer.from(objJsonStr).toString("base64");
		}
		const { url, method, success, data, postProcessSuccess, postProcessError } =
			action.payload;

		if (method) {
			axios({
				method,
				url: BASE_URL + url,
				data: data ? data : null
			})
				.then((response) => {
					if(validateError(response.data,url)) return;
					if(response.data && response.data._payload  &&  Array.isArray(  response.data._payload)){
						response.data._payload = convertAllMapDataState(response?.data?._payload)
					}
					if (success) dispatch(success(response.data));
					if (postProcessSuccess) postProcessSuccess(response.data);
				})
				.catch((err) => {
					//dispatch({ type: constants.TOGGLE_LOADER })
					validateToken(err, dispatch);
					if(validateError(err?.response?.data, url)) return;

					if (!err.response) console.warn(err);
					else {
						if (err.response && err.response.status === 403)
							dispatch(logoutUser());
						if (err.response.data.error) {
							if (postProcessError) postProcessError(err.response.data);
						}
					}
				});
		} else {
			dispatch(success());
		}
	};

	function validateToken(err, dispatch) {
		if (typeof err.response !== "undefined") {
			if (err.response.hasOwnProperty("data")) {
				const { data } = err.response;
				if (data.message === "Token has expired") {
					dispatch(logoutUser());
				}
			}
		}
	}


function validateError(data,url){
	
	// eslint-disable-next-line no-mixed-operators
	if(data && (data?.statusCode === 400 || data?.statusCode === 422) || (data?.code === 400 || data?.code === 422)){
		let messages = data?.messages;
		let str = "  Mensajes de validación:   ";
		if (messages){
			for (const [key, value] of Object.entries(messages)) {
				str= `
			  
			  ${key} - ${value}  
			`;
				errorGlobal(""+str);
			}
		}
		
		if(data?.message){
			errorGlobal(data?.message ?? "Error", 0.1);
		}
		return true;
	}else{
		if(data && data?.error && data?.code !== 200 && data?.statusCode !== 200){
			warning(data?.message ?? "posible error Y/o la consulta no retorno datos en la ruta "+url);
		}else if(data && data.exception === "Error"){
			errorGlobal(data?.message ?? "Error", 0.1);
		}
	}
}