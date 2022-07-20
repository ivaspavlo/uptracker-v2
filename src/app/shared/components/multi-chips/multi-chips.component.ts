
import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { fromEvent, Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, map, tap, delay } from 'rxjs/operators';
import { isValidEmail } from '@app/shared/helpers';

export interface IChip { value: string; isValid: boolean; }

@Component({
  selector: 'app-multi-chips',
  templateUrl: './multi-chips.component.html',
  styleUrls: ['./multi-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiChipsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() clear$: Observable<void>;
  @Output() changeChips: EventEmitter<string[]> = new EventEmitter();
  @ViewChild('chipsInput') chipsInput: ElementRef;
  public chips$: BehaviorSubject<IChip[]> = new BehaviorSubject([]);

  private componentDestroyed$: Subject<void> = new Subject();
  private PASTE_EVENT_NAME = 'paste';
  private CLIPBOARD_DATA_NAME = 'Text';

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.listenToPasteEvent();
    this.listenToChipsChange();
    this.listenToClearCommand();
  }

  // PUBLIC METHODS

  public onDeleteChip(removeIdx: number): void {
    this.chips$.next(this.chips$.getValue().filter((chip: IChip, idx: number) => idx !== removeIdx));
  }

  public onEnter(value: string): void {
    this.chips$.next([ ...this.chips$.getValue(), this.createChip(value) ]);
    this.clearInputValue();
  }

  // PRIVATE METHODS

  private listenToPasteEvent(): void {
    fromEvent(this.chipsInput.nativeElement, this.PASTE_EVENT_NAME).pipe(
      takeUntil(this.componentDestroyed$),
      map((event: ClipboardEvent) => [ ...this.chips$.getValue(), ...this.getNewChips(event.clipboardData.getData(this.CLIPBOARD_DATA_NAME)) ]),
      tap(res => this.chips$.next(res)),
      delay(0)
    ).subscribe(_ => this.clearInputValue());
  }

  private listenToChipsChange(): void {
    this.chips$.pipe(
      takeUntil(this.componentDestroyed$),
      map((res: IChip[]) => res.map(chip => chip.value))
    ).subscribe((res: string[]) => this.changeChips.emit(res));
  }

  private listenToClearCommand(): void {
    if (this.clear$) { this.clear$.pipe(takeUntil(this.componentDestroyed$)).subscribe(_ => this.chips$.next([])); }
  }

  private getNewChips(value: string): IChip[] {
    return value.split(',').map(this.createChip);
  }

  private createChip(value: string): IChip {
    return { value, isValid: isValidEmail(value) };
  }

  private clearInputValue(): void {
    this.chipsInput.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}

// samoran4ez@gmail.com, samoran4ez@gmail.com, samoran4ez@gmail.com