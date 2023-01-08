import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Quote, SentimentInfo, StockSymbols } from '../models/stocks.models';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  configUrl: string = "https://finnhub.io/api/v1/";
  token: string = "&token=bu4f8kn48v6uehqi3cqg";

  constructor(private http: HttpClient) { }

  public searchCompanyStock(search: string): Observable<StockSymbols> {
    return this.http.get<StockSymbols>(`${this.configUrl}/search?q=${search}${this.token}`);
  }

  public getQuoteData(search: string): Observable<Quote>{
    return this.http.get<Quote>(`${this.configUrl}/quote?symbol=${search}${this.token}`);
  }

  getSentiment(symbol: string, from: string, to:string): Observable<SentimentInfo>{
    return this.http.get<SentimentInfo>(
      `${this.configUrl}stock//insider-sentiment?symbol=${symbol}&from=${from}&to=2022-12-31${this.token}`
    );
  }
  
}
