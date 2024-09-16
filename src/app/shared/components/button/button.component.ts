import { ChangeDetectionStrategy, Component, input , computed, output, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule  } from '@angular/material/button'; 
// import { WpApiService } from '@eco-frontends/services';
import { HttpClient } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
// import { IconComponent } from '@eco-frontends/ui-elements';


export type ButtonType = 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab' | 'cta' | 'tab';
export type IconPosition = 'left' | 'right'

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [WpApiService]
})
export class ButtonComponent {
  // private wpService:WpApiService = inject(WpApiService);
  disabled = input(false);
  type = input<ButtonType>('flat')
  text = input<string>();
  color = input<string | undefined>('accent');
  icon = input<string>('');
  iconPosition = input<IconPosition>('right');
  buttonClicked = output()
  active = input<boolean>(false)

  onButtonClick() {
    this.buttonClicked.emit()
    // this.wpService.init()
  }
}
