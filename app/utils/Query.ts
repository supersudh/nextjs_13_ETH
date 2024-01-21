"use server";
import axios from 'axios';

export type FetchTransactions = {
  currentUserAddress: string,
  limit?: number,
  offset?: number,
  tokenSymbol?: string
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-API-KEY': process.env.BITQUERY_V2_API_KEY,
  'Authorization': `Bearer ${process.env.BITQUERY_V2_ACCESS_TOKEN}`
};

const GRAPHQL_URL = 'https://graphql.bitquery.io';

export async function fetchTransactionsServer(options: FetchTransactions) {
  "use server";
  const {
    currentUserAddress,
    limit = 25,
    offset = 0,
    tokenSymbol = 'ETH',
  } = options;
  try {
    if (!currentUserAddress) {
      throw new Error('account address not present');
    }
    const headers = defaultHeaders;
    const variables = {
      network: 'ethereum',
      address: currentUserAddress,
      limit,
      offset,
      // tokenSymbol
    };
    const query = JSON.stringify({
      query: `query ($network: EthereumNetwork!, $address: String!, $limit: Int!, $offset: Int!) {
                  ethereum(network: $network) {
                    transfers(
                      options: {desc: "block.height", limit: $limit, offset: $offset}
                      amount: {gteq: 0}
                      any: [{sender: {is: $address}}, {receiver: {is: $address}}]
                    ) {
                      wallet: receiver {
                        address
                      }
                      block {
                        timestamp {
                          time(format: "%Y-%m-%d %H:%M:%S")
                        }
                        height
                      }
                      address: sender {
                        address
                        annotation
                        smartContract {
                          contractType
                        }
                      }
                      currency {
                        address
                        symbol
                        tokenType
                      }
                      amount
                      transaction {
                        hash
                      }
                    }
                  }
                }`,
      variables,
    });
    const { data } = await axios.post(GRAPHQL_URL, query, { headers, maxBodyLength: Infinity });
    return data.data.ethereum.transfers;
  } catch (error) {
    console.log('Error in fetching txs');
    console.log(error);
  }
}

// class Query {
//   static GRAPHQL_URL = 'https://graphql.bitquery.io';

//   private buildHeadersObject() {
//     "use server";
//     return defaultHeaders;
//   }
//   async fetchTransactions(options: FetchTransactions) {
//     "use server";
//     const {
//       currentUserAddress,
//       limit = 25,
//       offset = 0,
//       tokenSymbol = 'ETH',
//     } = options;
//     try {
//       if (!currentUserAddress) {
//         throw new Error('account address not present');
//       }
//       const headers = this.buildHeadersObject();
//       const variables = {
//         network: 'ethereum',
//         address: currentUserAddress,
//         limit,
//         offset,
//         // tokenSymbol
//       };
//       const query = JSON.stringify({
//         query: `query ($network: EthereumNetwork!, $address: String!, $limit: Int!, $offset: Int!) {
//                   ethereum(network: $network) {
//                     transfers(
//                       options: {desc: "block.height", limit: $limit, offset: $offset}
//                       amount: {gteq: 0}
//                       any: [{sender: {is: $address}}, {receiver: {is: $address}}]
//                     ) {
//                       wallet: receiver {
//                         address
//                       }
//                       block {
//                         timestamp {
//                           time(format: "%Y-%m-%d %H:%M:%S")
//                         }
//                         height
//                       }
//                       address: sender {
//                         address
//                         annotation
//                         smartContract {
//                           contractType
//                         }
//                       }
//                       currency {
//                         address
//                         symbol
//                         tokenType
//                       }
//                       amount
//                       transaction {
//                         hash
//                       }
//                     }
//                   }
//                 }`,
//         variables,
//       });
//       const { data } = await axios.post(Query.GRAPHQL_URL, query, { headers, maxBodyLength: Infinity });
//       return data.data.ethereum.transfers;
//     } catch (error) {
//       console.log('Error in fetching txs');
//       console.log(error);
//     }
//   }
// }