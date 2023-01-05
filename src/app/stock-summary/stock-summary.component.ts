import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/data.service';
import { SentimentData, SentimentInfo } from '../models/stocks.models';


@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-summary.component.html',
  styleUrls: ['./stock-summary.component.scss']
})
export class StockSummaryComponent implements OnInit {
  
  private monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  public stockSymbol = this.route.snapshot.paramMap.get('id');
  public stockDetails$:Observable<SentimentInfo> = of()

  constructor(private route:ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    if(this.stockSymbol){
      const fromDate = new Date(new Date().setMonth(new Date().getMonth()-4)).toISOString().slice(0, 10);;
      const toDate = new Date().toISOString().slice(0, 10);;
      this.stockDetails$ = this.dataService.getSentiment(this.stockSymbol, fromDate, toDate);
    }
  }

  public getMonthDetails(month:number){
    return this.monthNames[month];
  }
}
