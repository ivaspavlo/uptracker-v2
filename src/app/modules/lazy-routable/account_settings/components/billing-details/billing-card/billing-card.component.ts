
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { IBankCard } from '../../../interfaces/bank-card.interface';

@Component({
  selector: 'app-billing-card',
  templateUrl: './billing-card.component.html',
  styleUrls: ['./billing-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingCardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  @Input() card: IBankCard;
  @Input() editable: boolean;
  @Output() edit =  new EventEmitter<IBankCard>();
  @Output() delete =  new EventEmitter<IBankCard>();
  @Output() setActive =  new EventEmitter<IBankCard>();

  ngOnInit(): void {
   // this.card.exp_year = this.card.exp_year.toString();
  }

  setCardActive(card: IBankCard): void {
    this.setActive.emit(card);
  }

  deleteCard(card: IBankCard): void {
    this.delete.emit(card);
  }

  editCard(card: IBankCard): void {
    this.edit.emit(card);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
