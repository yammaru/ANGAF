export const isCheckoutPage = () => {
    const currentPath = window.location.pathname;
    return /mundoanga|soyanga|conviccion|capacitacion|genteanga|yourlook/.test(currentPath);
};