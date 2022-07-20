import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sticky-footer',
  template: `
    <footer>
      <div class="wrap row no-gutters border-top-1 border-color-grey-A300 bg-white d-flex align-items-center">
        <ng-content></ng-content>
      </div>
    </footer>
  `,
  styleUrls: ['./sticky-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StickyFooterComponent { }
