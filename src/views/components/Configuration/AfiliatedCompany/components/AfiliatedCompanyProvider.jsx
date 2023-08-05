import React, {createContext } from 'react';

export const AfiliatedCompanyContext = createContext();

export const AfiliatedCompanyProvider = ( {children, afiliatedCompany} ) => {
  
	return(
		<AfiliatedCompanyContext.Provider value = {{afiliatedCompany}}>
			{children}
		</AfiliatedCompanyContext.Provider>
	) 
}