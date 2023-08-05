export const validatePermission = (idPermission) => {
	if (!localStorage.getItem("USER_PERMISSIONS")) return false;
	const permissions = (JSON.parse(
		localStorage.getItem("USER_PERMISSIONS")
	));
	return !!permissions.find((p) => parseInt(p) === parseInt(idPermission));
};

export const validateModule = (idSubModule) => {
	if (!localStorage.getItem("USER_MODULES")) return;
	let hasModule = false;
	const modules = (JSON.parse(localStorage.getItem("USER_MODULES")));
	modules.forEach((module) => {
		if (module.sub_modules.find((s) => parseInt(s.id) === parseInt(idSubModule))) {
			hasModule = true;
		}
	});
	return hasModule;
};



export const getPermissionLocalStorage = () => {
	return localStorage.getItem("USER_PERMISSIONS")
}
