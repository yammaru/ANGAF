import React, {createContext} from 'react';

export const RegisterTypeContext = createContext();

export const RegisterTypeProvider = ( {children,registerType} ) => {
  
	return(
		<RegisterTypeContext.Provider value = {{registerType}}>
			{children}
		</RegisterTypeContext.Provider>
	) 
}