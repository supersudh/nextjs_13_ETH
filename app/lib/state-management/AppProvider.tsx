"use client";
import React, {
  createContext,
  Dispatch,
  useContext,
  useReducer,
} from 'react';

import { AppState, AppActionType } from './types';
import { initialAppState } from './constants';
import appReducer from './reducer';

const AppContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<Dispatch<AppActionType> | undefined>(undefined);

interface AppContextProviderProps {
  children: JSX.Element;
  customInitialState?: AppState;
}

// The AppContextProvider that takes children consuming context
export const AppContextProvider = ({
  children,
  customInitialState = undefined // customInitialState for testing purposes
}: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, customInitialState || initialAppState);
  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

// Our hook to get and dispatch context
export const useAppContext = (): [AppState, Dispatch<AppActionType>] => {
  const appContext = useContext(AppContext);
  const appDispatchContext = useContext(AppDispatchContext);
  if (appContext === undefined || appDispatchContext === undefined) {
    throw new Error('Error instantiating appContext or appDispatchContext');
  }
  return [appContext, appDispatchContext];
};
