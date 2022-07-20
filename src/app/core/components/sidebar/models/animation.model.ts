import { trigger, transition, animate, style, state } from '@angular/animations';


export const ANIMATION_MODEL = [
  trigger('openClose', [
    state('open', style({})),
    state('closed', style({
      width: '64px',
    })),
    transition('open => closed', [
      animate('0.1s')
    ]),
    transition('closed => open', [
      animate('0.1s')
    ]),
  ])];
