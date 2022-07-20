
export const ACCOUNT_PLANS = [
  {
    id: '1',
    title: 'lite',
    price: 5999,
    additional_location_price: 1000,
    additional_location_qty: 0,
    features: [
      { name: 'item1', isIncluded: true },
      { name: 'item2', isIncluded: true },
      { name: 'item3', isIncluded: true },
      { name: 'item4', isIncluded: false },
      { name: 'item5', isIncluded: false }
    ],
    isSelected: false
  }, {
    id: '2',
    title: 'pro',
    price: 8999,
    additional_location_price: 1500,
    additional_location_qty: 0,
    features: [
      { name: 'item1', isIncluded: true },
      { name: 'item2', isIncluded: true },
      { name: 'item3', isIncluded: true },
      { name: 'item4', isIncluded: true },
      { name: 'item5', isIncluded: true }
    ],
    isSelected: false
  }
];
