
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper-small',
  templateUrl: './stepper-small.component.html',
  styleUrls: ['./stepper-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperSmallComponent implements OnInit {

  @Input() currentStep = 0;
  @Input() steps: { title: string; isDisabled: boolean; isComplete: boolean; }[];
  @Output() stepSmall: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  public onStepClick(stepIdx: number): void {
    this.stepSmall.emit(stepIdx);
  }

}
