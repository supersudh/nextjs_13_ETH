import { AppState } from './types';

export enum APP_CONSTANTS {
  SET_IS_CONNECTED_TO_BLOCKCHAIN = 'SET_IS_CONNECTED_TO_BLOCKCHAIN',
  SET_ACTIVE_ADDRESS = 'SET_ACTIVE_ADDRESS',
  SET_ACTIVE_CHAIN = 'SET_ACTIVE_CHAIN',
  SET_ACTIVE_TOKEN = 'SET_ACTIVE_TOKEN',
  SET_TRANSACTIONS = 'SET_TRANSACTIONS',
  APPEND_TRANSACTIONS = 'APPEND_TRANSACTIONS'
}

// The initial App State
export const initialAppState: AppState = {
  isConnectedToBlockchain: false,
  activeAddress: '',
  activeChain: undefined,
  activeToken: '',
  transactions: [],
};
