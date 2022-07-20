
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ILocation } from '@app/interfaces';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationCardComponent implements OnInit {

  @Input() location: ILocation;
  @Input() isOnlyOneLocation: boolean;

  @Output() delete: EventEmitter<ILocation> = new EventEmitter();
  @Output() edit: EventEmitter<ILocation> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

}
