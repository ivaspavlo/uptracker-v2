
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IBillingHistoryResponce } from '../../../interfaces';
import { CallState, LoadingState } from '@app/shared/constants';
import { CALL_STATE } from '../../../constants';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingHistoryComponent implements OnInit, OnDestroy {

  @Input() history: Observable<IBillingHistoryResponce>;
  public displayedColumns = [
    'price',
    'date',
    'paid',
  ];
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
