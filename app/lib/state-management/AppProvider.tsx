"use client";
import {
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

// The AppContextProvider that takes children consuming context
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
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
