import React, {createContext } from 'react';

export const AttentionPlacesContext = createContext();

export const AttentionPlacesProvider = ( { children, attentionPlaces } ) => {
  
	return(
		<AttentionPlacesContext.Provider value = {{ attentionPlaces }}>
			{children}
		</AttentionPlacesContext.Provider>
	) 
}