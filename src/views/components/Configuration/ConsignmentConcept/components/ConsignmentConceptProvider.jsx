import React, {createContext } from 'react';

export const ConsignmentConceptContext = createContext();

export const ConsignmentConceptProvider = ( {children, consignmentConcept} ) => {
  
	return(
		<ConsignmentConceptContext.Provider value = {{consignmentConcept}}>
			{children}
		</ConsignmentConceptContext.Provider>
	) 
}