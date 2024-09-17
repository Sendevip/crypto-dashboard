import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loadCryptocurrencies } from './store/dashboard.actions';
import { Observable } from 'rxjs';
import { CryptoApiRequest, Cryptocurrency } from '../../core/models/cryptocurrency.model';
import { selectCryptocurrencies } from './store/dashboard.selectors';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { MenuService } from '../../core/services/menus/menu.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  template: `
    <ui-navbar [logo]="logo" [menuItems]="menuService.getMenuItems()">
      <router-outlet/>
    </ui-navbar>
    `,
  styles: []
})
export class DashboardComponent implements OnInit {

  logo = 'assets/images/logo.png';
  menuService = inject(MenuService);
  private router = inject(Router);
  private store = inject(Store);

  ngOnInit() {
    const request:CryptoApiRequest = { currency:'usd', order:'market_cap_desc', perPage:10, page:1 };
    this.store.dispatch(loadCryptocurrencies({ request }));
  }


}
