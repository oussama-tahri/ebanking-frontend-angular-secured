import { Component, OnInit } from '@angular/core';
import {CurrencyDepositService} from "../services/currency-deposit.service";

@Component({
  selector: 'app-currency-deposit',
  templateUrl: './currency-deposit.component.html',
  styleUrls: ['./currency-deposit.component.css']
})
export class CurrencyDepositComponent implements OnInit {
  currencies : any;
  constructor(private depositService : CurrencyDepositService) { }

  ngOnInit(): void {
    this.depositService.getDeposits().subscribe({
      next : value => {
        this.currencies=value;
      }, error : err => {
        alert(err);
      }
    })
  }

}
