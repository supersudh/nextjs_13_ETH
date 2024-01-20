import {
  AppendTransactionsType, SetActiveAddressType,
  SetActiveChainType, SetActiveTokenType, SetIsConnectedToBlockchainType,
  SetTransactionsType
} from './types';
import { APP_CONSTANTS } from './constants';

// App actions
export const setIsConnectedToBlockchain = (payload: boolean): SetIsConnectedToBlockchainType => ({
  type: APP_CONSTANTS.SET_IS_CONNECTED_TO_BLOCKCHAIN,
  payload,
});

export const setActiveAddress = (payload: undefined | string): SetActiveAddressType => ({
  type: APP_CONSTANTS.SET_ACTIVE_ADDRESS,
  payload,
});

export const setActiveChain = (payload: undefined | number): SetActiveChainType => ({
  type: APP_CONSTANTS.SET_ACTIVE_CHAIN,
  payload,
});

export const setActiveToken = (payload: string): SetActiveTokenType => ({
  type: APP_CONSTANTS.SET_ACTIVE_TOKEN,
  payload,
});

export const setTransactions = (payload: any[]): SetTransactionsType => ({
  type: APP_CONSTANTS.SET_TRANSACTIONS,
  payload
});

export const appendTransactions = (payload: any[]): AppendTransactionsType => ({
  type: APP_CONSTANTS.APPEND_TRANSACTIONS,
  payload,
});
