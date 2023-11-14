import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Wallet} from "../model/wallet.model";
import {ADD_WALLET, GET_ALL_CURRENCIES, GET_USER_WALLETS} from "../queries/graphql.queries";
import {map, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Currency} from "../model/currency.model";
@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {
  wallets$ : Observable<Wallet[]>=of([]);
  currencies$ : Observable<Currency[]>=of([]);
  walletFormGroup! : FormGroup;
  constructor(private apollo:Apollo, private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getMyWallets();
    this.getAllCurrencies();
    this.walletFormGroup=this.fb.group({
      balance :  this.fb.control(1000),
      currency: this.fb.control("")
    });
  }
  getMyWallets(){
    this.wallets$=this.apollo.watchQuery<{userWallets: [Wallet]}>({
      query : GET_USER_WALLETS, fetchPolicy : "no-cache"
    }).valueChanges.pipe(map(result=>result.data.userWallets));
  }
  getAllCurrencies(){
    this.currencies$=this.apollo.watchQuery<{currencies: [Currency]}>({
      query : GET_ALL_CURRENCIES
    }).valueChanges.pipe(map(result=>result.data.currencies));
  }
  getWalletTransactions(wallet: Wallet) {
    this.router.navigateByUrl("/transactions/"+wallet.id);
  }

  handleAddNewWallet() {
    console.log("Add Wallet Process");
    this.apollo.mutate<{addWallet: Wallet}>({
      mutation : ADD_WALLET,
      variables : {
        cs : this.walletFormGroup.value.currency,
        ib : this.walletFormGroup.value.balance,
      },
      update :(store, {data})=>{
        if(data?.addWallet){
          var cachedWalletList=store.readQuery<{userWallets: Wallet[]}>({
            query : GET_USER_WALLETS
          });
          if(cachedWalletList && cachedWalletList.userWallets.length>0){
            var newList=[...cachedWalletList.userWallets];
            newList.unshift(data.addWallet);
            store.writeQuery<{userWallets: Wallet[]}>({
              query : GET_USER_WALLETS,
              data : {userWallets:newList}
            })
          }
        }
      }
    }).subscribe(data=>{
      this.wallets$=of([]);
      this.getMyWallets();
    })
  }
}
