export interface Quote {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

export interface ResultData {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

export interface Sentiment {
    change: number;
    month: number;
    mspr: number;
    symbol: string;
    year: number;
}

export interface SentimentInfo {
    data: Sentiment[];
    symbol: string;
}


export interface StockInfo {
    stockSymbols: ResultData;
    quotes: Quote;
}

export interface Stocks {
    description: string;
    symbol: string;
    d: number;
    c: number;
    o: number;
    h: number;
}

export interface StockSymbols {
    count: number;
    result: ResultData[];
}


export interface stockListData extends Stocks {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
};

export interface SentimentData {
    buy: string;
    hold: string;
    period: Date;
    sell: string;
    strongBuy: string;
    strongSell: string;
    symbol: string;
}