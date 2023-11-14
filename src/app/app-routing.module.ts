import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrenciesComponent} from "./currencies/currencies.component";
import {ContinentsComponent} from "./continents/continents.component";
import {WalletsComponent} from "./wallets/wallets.component";
import {WalletTransactionsComponent} from "./wallet-transactions/wallet-transactions.component";
import {CurrencyDepositComponent} from "./currency-deposit/currency-deposit.component";
import { AuthGuard } from './guards/security.guard';

const routes: Routes = [
  {
    path : "currencies", component : CurrenciesComponent
  },
  {
    path : "continents", component : ContinentsComponent
  },
  {
    path : "wallets", component : WalletsComponent, canActivate : [AuthGuard], data : {roles : ['USER']}
  },
  {
    path : "transactions/:walletId", component : WalletTransactionsComponent, canActivate : [AuthGuard], data : {roles : ['USER','ADMIN']}
  },
  {
    path : "currencyDeposit", component : CurrencyDepositComponent, canActivate : [AuthGuard], data : {roles : ['USER','ADMIN']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
