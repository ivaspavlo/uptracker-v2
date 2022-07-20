
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-no-conent-available',
  templateUrl: './no-conent-available.component.html',
  styleUrls: ['./no-conent-available.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoConentAvailableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
