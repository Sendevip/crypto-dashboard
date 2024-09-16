import { Injectable, signal, effect, computed } from '@angular/core';
import { MenuItem } from '../../../shared/models/menu-item.model';



@Injectable({
  providedIn: 'root'
})
export class MenuService {

  activeRoute = signal('/')

  private menuItems = signal<MenuItem[]>([
    {
      label: 'Currencies Table', icon:'table_chart', route: 'currencies-table'
    },
    {
      label: 'Currencies Chart', icon:'insights', route: 'currencies-chart',
    },
  ]);

  getMenuItems(): MenuItem[] {
    return this.menuItems()
  }

}
