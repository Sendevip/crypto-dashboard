import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet/>',
  styles: [],
  standalone:true,
  imports:[RouterModule]
})
export class AppComponent {
  title = 'crypto-dashboard';
}
