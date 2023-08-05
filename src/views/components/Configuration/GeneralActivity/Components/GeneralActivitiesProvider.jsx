import React, {createContext} from 'react';

export const GeneralActivitiesContext = createContext();

export const GeneralActivitiesProvider = ({children,context}) => {
	return (
		<GeneralActivitiesContext.Provider value={{context}}>
			{children}
		</GeneralActivitiesContext.Provider>
	);
}