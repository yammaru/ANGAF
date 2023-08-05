import React, {createContext } from 'react';

export const ChannelContext = createContext();

export const ChannelProvider = ( {children, channel} ) => {
  
	return(
		<ChannelContext.Provider value = {{ channel }}>
			{children}
		</ChannelContext.Provider>
	) 
}