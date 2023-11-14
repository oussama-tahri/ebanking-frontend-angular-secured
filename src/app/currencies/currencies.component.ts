import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Currency} from "../model/currency.model";
import {GET_ALL_CURRENCIES} from "../queries/graphql.queries";
import {map, Observable, of} from "rxjs";

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  currencies$ : Observable<Currency[]> =of([]);
  constructor(private apollo : Apollo) { }

  ngOnInit(): void {
    this.currencies$ = this.apollo.watchQuery<{currencies:Currency[]}>({
      query : GET_ALL_CURRENCIES
    })
      .valueChanges.pipe(map(result=>result.data.currencies));
  }

}
