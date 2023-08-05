import React, {createContext } from 'react';
export const AdvertisingImageContext = createContext();
export const AdvertisingImageProvider = ( {children, advertisingImage} ) => {

	return(
		<AdvertisingImageContext.Provider value = {{advertisingImage}}>
			{children}
		</AdvertisingImageContext.Provider>
	) 
}