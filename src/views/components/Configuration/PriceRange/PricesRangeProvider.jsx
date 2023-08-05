import React, {createContext } from 'react';

export const PricesRangeContext = createContext();

export const PricesRangeProvider = ( {children, pricesRange} ) => {
  
	return(
		<PricesRangeContext.Provider value = {{pricesRange}}>
			{children}
		</PricesRangeContext.Provider>
	) 
}