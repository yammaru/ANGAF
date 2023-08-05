export function getUSerLocalStorage() {
	return JSON.parse(localStorage.getItem('USER_INFO'));
}

export function getUSerId() {
	let user =  getUSerLocalStorage();
	return user['id'];
}

export function getUSerIdProfile() {
	let user =  getUSerLocalStorage();
	return user['idProfile'];
}
