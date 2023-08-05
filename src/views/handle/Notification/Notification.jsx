import { notification } from "antd";

export const openNotificationWithIcon = (type,message,duration=4.5) => {
	notification[type]({
		message: `${type}:`,
		description:
		`${ message.toString()}`,
		duration
	});
};

export const error = (response) => {
	openNotificationWithIcon('error', response);
}

export const success = (response) => {
	openNotificationWithIcon('success',response);
}

export const errorPolicy = (response) => {
	openNotificationWithIcon('error', response);
}

export const errorAssigment = (response) => {
	openNotificationWithIcon('error', response);
}

export const errorGlobal = (response, duration=4.5) => {
	openNotificationWithIcon('error', response, duration);
}

export const warning  = ( text ) => {
	openNotificationWithIcon('warning', text)
}
