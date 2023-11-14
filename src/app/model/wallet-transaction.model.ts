import {Wallet} from "./wallet.model";
export interface WalletTransaction{
  id : string,
  timestamp : number,
  amount : number,
  currencyPrice:number,
  type : string,
  targetWallet : Wallet
}
