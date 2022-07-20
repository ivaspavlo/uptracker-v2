
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthHeaderComponent {

  @Input() title: string;
  @Input() subTitle: string;

}
