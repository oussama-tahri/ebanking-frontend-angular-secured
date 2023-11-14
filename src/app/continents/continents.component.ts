import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Continent} from "../model/continent.model";
import {GET_ALL_CONTINENTS, GET_COUNTRIES_BY_CONTINENT} from "../queries/graphql.queries";
import {map, Observable, of} from "rxjs";
import {Country} from "../model/country.model";

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {
  continents$:Observable<Continent[]> = of([]);
  currentContinent! : Continent;
  countries$:Observable<Country[]> = of([]);
  constructor(private apollo:Apollo) { }

  ngOnInit(): void {
    this.continents$=this.apollo.watchQuery<{continents:[Continent]}>({
      query : GET_ALL_CONTINENTS
    }).valueChanges.pipe(map(results=>results.data.continents));
  }

  getCountries(continent: Continent) {
    this.currentContinent=continent;
    this.countries$=this.apollo.watchQuery<{countriesByContinent:[Country]}>({
      query : GET_COUNTRIES_BY_CONTINENT,
      variables : {id : continent.id}
    }).valueChanges.pipe(map(results=>results.data.countriesByContinent));
  }
}
