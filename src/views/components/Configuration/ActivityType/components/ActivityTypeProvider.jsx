import React, {createContext} from 'react';

export const ActivityTypeContext = createContext();

export const ActivityTypeProvider = ( {children,activityType} ) => {
  
	return(
		<ActivityTypeContext.Provider value = {{activityType}}>
			{children}
		</ActivityTypeContext.Provider>
	) 
}