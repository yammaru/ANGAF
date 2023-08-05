import React, {createContext } from 'react';

export const ProjectsClassificationContext = createContext();

export const ProjectsClassificationProvider = ( {children, projectsClassification} ) => {
  
	return(
		<ProjectsClassificationContext.Provider value = {{projectsClassification}}>
			{children}
		</ProjectsClassificationContext.Provider>
	) 
}