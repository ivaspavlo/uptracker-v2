
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormField } from '@app/interfaces';
import { AccountSettingsFormControl } from '../../constants/account-settings-form-control';
import { Subject, Observable } from 'rxjs';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { IBankCard } from '../../interfaces';
import { first, take, takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-acc-settings',
  templateUrl: './acc-settings.component.html',
  styleUrls: ['./acc-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccSettingsComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public isFormLoading: boolean;
  @Input() public fieldMap: Map<AccountSettingsFormControl, IFormField>;
  @Input() public cards$: Observable<Array<IBankCard>>;
  @Input() public billingEmail$: Observable<string>;
  @Input() public form: FormGroup;
  @Input() public currentTab: number;

  @ViewChild('tabs') public tabGroup: MatTabGroup;

  @Output() public formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() public clearForm: EventEmitter<any> = new EventEmitter();
  @Output() public locationSelected: EventEmitter<any> = new EventEmitter();
  @Output() public tab: EventEmitter<any> = new EventEmitter();
  public currentTabInx: number;

  private destroy = new Subject<void>();

  constructor() { }

  public ngAfterViewInit(): void {
    if (this.currentTab) {
      this.tabGroup.selectedIndex = this.currentTab;
    }
  }

  public tabChanged(tab: MatTabChangeEvent) {
    this.currentTabInx = tab.index;
    this.tab.emit(tab);
  }

  public ngOnInit(): void {
    this.currentTabInx = 0;
  }

  public onAccountLocationSelected(locName: string): void {
    this.locationSelected.emit(locName);
  }

  public onAccountSettingsSubmit(val): void {
    this.formSubmit.emit(val);
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
