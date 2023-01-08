import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators'
import { ResultData, StockInfo, stockListData, StockSymbols } from '../models/stocks.models';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public stockData$: Observable<StockInfo> = new Observable();
  public stockSearch$: Observable<StockSymbols> = new Observable();
  public stockList: stockListData[] = [];
  public stocksLoading: boolean = false;
  public trackerForm: FormGroup = new FormGroup({
    stockInput: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)])
  });

  private _subscription = new Subscription();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.stockList = this.getStocksList();
  }

  public trackStock(): void{
    const stockId = this.trackerForm.controls['stockInput'].value;
    if(stockId){
      this.stocksLoading = true;
      const stockQuote$ = this.dataService.getQuoteData(stockId);
      const stockSearch$ = this.dataService.searchCompanyStock(stockId).pipe(
        map((res:StockSymbols) => res.result.filter((stock:ResultData) => stock.symbol === stockId)?.[0] || []
      ));
      if(stockId) {
        this.stockData$ = combineLatest({
          stockSymbols: stockSearch$,
          quotes: stockQuote$,
        })
          .pipe(
            map((response: StockInfo) => {
              const matchedIndex = this.stockList.findIndex((stock: stockListData) => stock.symbol === response.stockSymbols.symbol);
              if(matchedIndex === -1){
                const list: stockListData = {
                  ...response.stockSymbols,
                  ...response.quotes
                }
                this.stockList.push(list);
                localStorage.setItem('stockList', JSON.stringify(this.stockList));
              }
              this.stocksLoading = false;
             return response;
            }));
            this._subscription.add(this.stockData$.subscribe());
            this.trackerForm.reset();
        }
    }
  }

  public removeStock(stockSymbol:string): void {
    const matchedIndex = this.stockList.findIndex((stock: stockListData) => stock.symbol === stockSymbol);
    this.stockList.splice(matchedIndex,1);
    localStorage.setItem('stockList', JSON.stringify(this.stockList));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); 
  }

  private getStocksList():stockListData[] {
    const stocks: string|null = localStorage.getItem('stockList');
    return stocks?JSON.parse(stocks):[]; 
  }
}
