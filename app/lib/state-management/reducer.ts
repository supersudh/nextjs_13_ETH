import { Reducer } from 'react';

import {
  AppState,
  AppActionType, AppendTransactionsType, SetActiveAddressType,
  SetActiveChainType, SetActiveTokenType, SetIsConnectedToBlockchainType,
  SetTransactionsType
} from './types';
import { APP_CONSTANTS, initialAppState } from './constants';

// App reducer function
const appReducer: Reducer<AppState, AppActionType> = (
  state = initialAppState,
  action
) => {
  const { payload } = action;
  switch (action.type) {
    case APP_CONSTANTS.SET_IS_CONNECTED_TO_BLOCKCHAIN: {
      return {
        ...state,
        isConnectedToBlockchain: payload as SetIsConnectedToBlockchainType['payload'],
      };
    }
    case APP_CONSTANTS.SET_ACTIVE_ADDRESS: {
      return {
        ...state,
        activeAddress: payload as SetActiveAddressType['payload'],
      };
    }
    case APP_CONSTANTS.SET_ACTIVE_CHAIN: {
      return {
        ...state,
        activeChain: payload as SetActiveChainType['payload'],
      };
    }
    case APP_CONSTANTS.SET_ACTIVE_TOKEN: {
      return {
        ...state,
        activeToken: payload as SetActiveTokenType['payload'],
      };
    }
    case APP_CONSTANTS.SET_TRANSACTIONS: {
      return {
        ...state,
        transactions: payload as SetTransactionsType['payload'],
      };
    }
    case APP_CONSTANTS.APPEND_TRANSACTIONS: {
      return {
        ...state,
        transactions: state.transactions.concat(...payload as AppendTransactionsType['payload']),
      };
    }
    default:
      return state;
  }
};

export default appReducer;
