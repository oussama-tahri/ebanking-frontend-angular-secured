import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Apollo} from "apollo-angular";
import {GET_WALLET_By_ID, WALLET_TRANSFER} from "../queries/graphql.queries";
import {Wallet} from "../model/wallet.model";
import {FormBuilder, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})
export class WalletTransactionsComponent implements OnInit {

  walletId! :string;
  wallet!:Wallet;
  walletTransferFormGroup! : FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private apollo:Apollo, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.walletId=this.activatedRoute.snapshot.params['walletId'];
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.walletId=this.activatedRoute.snapshot.params['walletId'];
      this.getWalletById();
    });
    this.walletTransferFormGroup=this.fb.group({
      sourceWalletId : this.fb.control(this.walletId),
      destinationWalletId : this.fb.control(""),
      amount : this.fb.control(100),
    })
    this.getWalletById();
  }

  newWalletTransfer() {
    this.apollo.mutate({
      mutation:WALLET_TRANSFER,
      variables : {
        sw: this.walletTransferFormGroup.value.sourceWalletId,
        dw: this.walletTransferFormGroup.value.destinationWalletId,
        mt: this.walletTransferFormGroup.value.amount,
      }
    }).subscribe(data=>{
      this.getWalletById();
    }, error => {
      alert(error);
    });
  }

  getWalletById(){
    this.apollo.watchQuery<{walletById:Wallet}>( {
        query : GET_WALLET_By_ID,
        fetchPolicy : "no-cache",
        variables : {
          walletId:this.walletId
        }
      }
    ).valueChanges.subscribe(data=>{
      this.wallet=data.data.walletById;
    });
  }
}
