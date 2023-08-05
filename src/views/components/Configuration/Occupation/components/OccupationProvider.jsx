import React, {createContext} from 'react';

export const OccupationContext = createContext();

export const OccupationProvider = ( {children,Occupation} ) => {
  
	return(
		<OccupationContext.Provider value = {{Occupation}}>
			{children}
		</OccupationContext.Provider>
	) 
}