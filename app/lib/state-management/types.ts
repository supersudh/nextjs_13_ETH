import { APP_CONSTANTS } from './constants';

export interface AppState {
  isConnectedToBlockchain: boolean;
  activeAddress: string;
  activeChain: undefined | number | string;
  activeToken: string;
  transactions: any[];
}

export type SetIsConnectedToBlockchainType = {
  type: typeof APP_CONSTANTS.SET_IS_CONNECTED_TO_BLOCKCHAIN;
  payload: boolean;
};

export type SetActiveAddressType = {
  type: typeof APP_CONSTANTS.SET_ACTIVE_ADDRESS;
  payload: undefined | string;
};

export type SetActiveChainType = {
  type: typeof APP_CONSTANTS.SET_ACTIVE_CHAIN;
  payload: undefined | number;
};

export type SetActiveTokenType = {
  type: typeof APP_CONSTANTS.SET_ACTIVE_TOKEN;
  payload: string;
};

export type SetTransactionsType = {
  type: typeof APP_CONSTANTS.SET_TRANSACTIONS;
  payload: any[];
};

export type AppendTransactionsType = {
  type: typeof APP_CONSTANTS.APPEND_TRANSACTIONS;
  payload: any[];
};

export type AppActionType =
  SetIsConnectedToBlockchainType |
  SetActiveAddressType |
  SetActiveChainType |
  SetActiveTokenType |
  SetTransactionsType |
  AppendTransactionsType;