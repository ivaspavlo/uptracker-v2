
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFileInputComponent implements OnInit, OnDestroy {

  @Input() title = 'Select File';
  @Input() clearFile$: Observable<any>;
  @Output() inputFile: EventEmitter<any> = new EventEmitter();

  public ctrl: FormControl = new FormControl();
  private componentDestroyed$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    if (this.clearFile$) {
      this.clearFile$.pipe(takeUntil(this.componentDestroyed$)).subscribe(_ => { this.ctrl.patchValue(null); });
    }
  }

  public onChange(event: Event): void {
    this.inputFile.emit(event);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
