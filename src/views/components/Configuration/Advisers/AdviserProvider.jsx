import React, {createContext } from 'react';

export const AdviserContext = createContext();

export const AdviserProvider = ( {children, adviser} ) => {
  
	return(
		<AdviserContext.Provider value = {{adviser}}>
			{children}
		</AdviserContext.Provider>
	) 
}