
import { Directive, HostListener, Input, Renderer2, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDisableAfterClick]'
})
export class DisableAfterClickDirective {

  @Input('appDisableAfterClick') reenableButton$: Observable<boolean>;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  @HostListener('click')
  onClick() {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    this.reenableButton$.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((res: boolean) => {
      res && this.renderer.removeAttribute(this.el.nativeElement, 'disabled')
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
