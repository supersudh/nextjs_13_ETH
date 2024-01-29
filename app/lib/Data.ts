import { FetchTransactions, fetchTransactionsServer } from "../utils/Query";

export const fetchTransactions = async (options: FetchTransactions) => {
  try {
    // const lsData = window.localStorage.getItem('transfers');
    // if (lsData) {
    //   console.log('Query.ts:cached...');
    //   return JSON.parse(lsData);
    // }
    const data = await fetchTransactionsServer(options);
    // window.localStorage.setItem("transfers", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('client:Error in fetching Transactions');
    console.log(error);
  }
};
