import React,{createContext} from 'react';

export const ModuleContext = createContext();

export const ModuleProvider = ({children,module}) => {
    return (
        <ModuleContext.Provider value={{module}}>
            {children}
        </ModuleContext.Provider>
    )
}