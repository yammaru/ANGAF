import React, {createContext } from 'react';

export const UsersContext = createContext();

export const UsersProvider = ( { children, users } ) => {
  
	return(
		<UsersContext.Provider value = {{users}}>
			{children}
		</UsersContext.Provider>
	) 
}