import { IBankCard } from '../interfaces';
import { CardTypes } from '../constants/bank-card-types';

export const BANK_CARDS: Array<any> = [
  {
    title: 'May Main card',
    type: CardTypes.mastercard,
    expires: '13/33',
    active: true,
    number: 5409
  },
  {
    title: 'May Second card',
    type: CardTypes.visa,
    expires: '03/23',
    active: false,
    number: 7873
  },
]
