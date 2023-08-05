import React, {createContext } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ( {children,profile} ) => {
  
	return(
		<ProfileContext.Provider value = {{profile}}>
			{children}
		</ProfileContext.Provider>
	) 
}