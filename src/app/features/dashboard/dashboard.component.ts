import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
export class DashboardComponent  {

  logo = 'assets/images/logo.png';
  menuService = inject(MenuService);

}

