
export default class LocalStorage {
	getToken () 
	{
		let userStorage = localStorage.getItem('USER_INFO');
		let user = JSON.parse(userStorage);
		return user.token;
	}
	getIdFromCurrentUser(){
		let userStorage = localStorage.getItem('USER_INFO');
		let user = JSON.parse(userStorage);
		return user.id;
	}
}
