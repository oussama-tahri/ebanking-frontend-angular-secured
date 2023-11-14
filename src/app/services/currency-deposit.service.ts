import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn:"root"})
export class CurrencyDepositService{
  constructor(private http:HttpClient) {
  }
  public getDeposits(){
    return this.http.get("http://localhost:8084/currencyDeposits");
  }
}
