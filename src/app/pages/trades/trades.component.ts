import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DxButtonModule, DxDataGridModule, DxSliderModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Product, Trade, TradesService } from './trades.service';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '@app/shared/directives/hasPermission.directive';
import { ROLE } from '@app/auth';

@Component({
  selector: 'trades-grid',
  templateUrl: `./trades.component.html`,
  styleUrls: ['./trades.component.scss'],
  imports: [DxDataGridModule, DxSliderModule, TranslateModule, HasPermissionDirective, DxButtonModule],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TradesComponent {
  productsDataSource: DataSource;

  trades: ArrayStore;

  updatesPerSecond = 100;
  role: typeof ROLE = ROLE;

  constructor(private service: TradesService) {
    this.productsDataSource = new DataSource({
      store: service.getProducts(),
      reshapeOnPush: true,
    });

    this.trades = service.getTrades();
    service.getTradeUpdates();
  }

  getDetailGridDataSource(product: Product) {
    return new DataSource({
      store: this.trades,
      reshapeOnPush: true,
      filter: ['ProductID', '=', product.ProductID],
    });
  }

  getAmount(trade: Trade) {
    return trade.UnitPrice * trade.Quantity;
  }
}
