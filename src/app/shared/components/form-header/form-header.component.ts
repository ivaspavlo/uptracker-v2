
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormHeaderComponent {

  @Input() title: string;
  @Input() subTitle: string;

  constructor() { }
}
