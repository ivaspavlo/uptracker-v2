
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IStep } from '@app/interfaces';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements OnInit {

  @Input() currentStep = 0;
  @Input() set steps(value: IStep[]) { this._steps = value; }
  get steps() { return this._steps; }

  @Output() step: EventEmitter<number> = new EventEmitter();

  private _steps: IStep[] = [];

  constructor() { }

  ngOnInit(): void { }

  public onStepClick(stepIdx: number): void {
    this.step.emit(stepIdx);
  }

}
