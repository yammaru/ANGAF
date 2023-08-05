import React, {createContext} from 'react';

export const CustomerContext = createContext();

export const CustomerProvider = ( {children, request} ) => {
	return(
		<CustomerContext.Provider value = {{request}}>			
			{children}
		</CustomerContext.Provider>
	) 
}