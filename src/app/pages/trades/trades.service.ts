/*
 * This file is just  for demo purpose. it is copied from example of devextreme
 * and it is not followed all standards of code comes from bollerpate project.
 * TODO: Product and Trade should be converted to types and stored in @core/types folder
 * This service generates Products and Trades and emulate updates comming from the server
 * Real service should use websocket to get real-time updates from the server
 *
 */

import { Injectable, NgZone } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';

export type ProductTypes = 'Energy' | 'Furures';

// it should be another service that gets data from the server
const systems = ['Solar', 'Magelan'];

const updatesPerSecond = 100;

export class Product {
  ProductID: number;

  ProductName: string;

  ProductType: ProductTypes;

  Quantity: number;

  Amount: number;

  TradeCount: number;
}

export class Trade {
  TradeID: number;

  ShipSystem: string;

  ProductID: number;

  UnitPrice: number;

  TradeDate: Date;

  Quantity: number;
}

// this solution just example generate random trades and updates every 50ms
function generateTestData(): [Product[], Trade[]] {
  const systems = ['Solar', 'Magelan'];

  const products: Product[] = [];

  for (let i = 1; i <= 100; i++) {
    products.push({
      ProductID: i,
      ProductName: `Product ${i}`,
      ProductType: i % 2 ? 'Energy' : 'Furures',
      Quantity: 0,
      Amount: 0,
      TradeCount: 0,
    });
  }

  const productsStore = new ArrayStore({
    data: products,
    key: 'ProductID',
  });

  const trades: Trade[] = [];

  const tradesStore = new ArrayStore({
    key: 'TradeID',
    data: trades,
  });

  return [products, trades];
}

@Injectable({
  providedIn: 'root',
})
export class TradesService {
  private products: Product[];
  private trades: Trade[];
  private productsStore: ArrayStore<Product, any>;
  private tradesStore: ArrayStore<Trade, any>;

  constructor(private _zone: NgZone) {
    const [products, trades] = generateTestData();
    this.products = products;
    this.trades = trades;

    this.productsStore = new ArrayStore({
      data: this.products,
      key: 'ProductID',
    });
    this.tradesStore = new ArrayStore({
      key: 'TradeID',
      data: this.trades,
    });
  }
  getProducts() {
    return this.productsStore;
  }

  getTrades() {
    return this.tradesStore;
  }

  getTradeCount() {
    return this.trades.length;
  }

  // this is just for demo purpose it creates random trades and updates tradesStore and productsStore
  addTrade() {
    const product = this.products[Math.round(Math.random() * 99)];
    const trade: Trade = {
      TradeID: this.trades.length ? this.trades[this.trades.length - 1].TradeID + 1 : 20001,
      ShipSystem: systems[Math.round(Math.random() * (systems.length - 1))],
      ProductID: product.ProductID,
      UnitPrice: Math.round(Math.random() * 100) + 1,
      TradeDate: new Date(),
      Quantity: Math.round(Math.random() * 20) + 1,
    };

    this.tradesStore.push([{ type: 'insert', data: trade }]);

    this.productsStore.push([
      {
        type: 'update',
        key: trade.ProductID,
        data: {
          TradeCount: product.TradeCount + 1,
          Quantity: product.Quantity + trade.Quantity,
          Amount: product.Amount + trade.UnitPrice * trade.Quantity,
        },
      },
    ]);
  }

  // this is just for demo purpose it should get data from the server with websocket
  getTradeUpdates() {
    // comment runOutsideAngular to see the difference in number of changeDetection circles
    this._zone.runOutsideAngular(() => {
      setInterval(() => {
        if (this.getTradeCount() > 500000) {
          return;
        }

        for (let i = 0; i < updatesPerSecond / 20; i++) {
          this.addTrade();
        }
      }, 50);
    });
  }
}
