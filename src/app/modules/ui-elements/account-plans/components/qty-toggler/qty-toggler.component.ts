
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qty-toggler',
  templateUrl: './qty-toggler.component.html',
  styleUrls: ['./qty-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QtyTogglerComponent implements OnInit {

  @Input() qty = 0;
  @Output() qtyChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  public onChange(isPlus: boolean): void {
    if (!isPlus && this.qty <= 0) { return; }
    this.qty = isPlus ? this.qty + 1 : this.qty - 1;
    this.qtyChange.next(this.qty);
  }

}
