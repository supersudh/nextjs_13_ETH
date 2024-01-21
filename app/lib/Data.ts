import { FetchTransactions, fetchTransactionsServer } from "../utils/Query";

export const fetchTransactions = async (options: FetchTransactions) => {
  try {
    const data = await fetchTransactionsServer(options);
    return data;
  } catch (error) {
    console.log('client:Error in fetching Transactions');
    console.log(error);
  }
};
