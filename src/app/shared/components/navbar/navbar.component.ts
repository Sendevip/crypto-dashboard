import { Component, inject, ChangeDetectionStrategy, ViewChild, input, ViewChildren, QueryList } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay, take, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ThemeSwitchButtonComponent } from '../theme-switch-button/theme-switch-button.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDrawer } from '@angular/material/sidenav';
import { MenuItem } from '../../models/menu-item.model';
import { ButtonComponent } from "../button/button.component";
@Component({
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    ThemeSwitchButtonComponent,
    MatMenuModule,
    MatExpansionModule,
    JsonPipe,
    ButtonComponent
  ]
})


export class NavbarComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChildren(MatMenuTrigger) menuTriggers!: QueryList<MatMenuTrigger>;
  private breakpointObserver = inject(BreakpointObserver);

  title = input('App Title');
  logo = input<string>('');
  menuItems = input<MenuItem[]>([]);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 991.98px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  trackByFn(item: MenuItem): string {
    return item.label;
  }

  handleMenuSelection() {
    this.isHandset$.pipe(take(1)).subscribe(isHandset => {
      if (isHandset && this.drawer) {
        this.drawer.close();
      }
    });
  }
}



