import {Currency} from "./currency.model";
import {WalletTransaction} from "./wallet-transaction.model";

export interface Wallet{
  id : string,
  createdAt : number,
  currency : Currency,
  balance : number,
  walletTransactions : WalletTransaction[]
}
