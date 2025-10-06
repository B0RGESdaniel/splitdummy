import {
  calculatePriceWithServiceTax,
  getParticipantTotal,
  getTotalPrice,
  FullItem
} from "./receipt-utils.ts"

const itemList: FullItem[] = [
  {
    itemId: 'item-001',
    itemDescription: 'Pizza de Calabresa',
    itemAmount: '1',
    totalParts: 2,
    partPrice: '25.50',
    totalPrice: 51.00,
    participants: [
      { idItem: 'item-001', idParticipant: 'user-01', part: 1 },
      { idItem: 'item-001', idParticipant: 'user-02', part: 1 },
    ],
  },
];

const itemsListMultiple: FullItem[] = [
  ...itemList,
  {
    itemId: 'item-002',
    itemDescription: 'Refrigerante',
    itemAmount: '1',
    totalParts: 1,
    partPrice: '10.00',
    totalPrice: 10.00,
    participants: [
      { idItem: 'item-002', idParticipant: 'user-01', part: 1 },
    ],
  },
  {
    itemId: 'item-003',
    itemDescription: 'Sobremesa',
    itemAmount: '1',
    totalParts: 2,
    partPrice: '15.00',
    totalPrice: 30.00,
    participants: [
      { idItem: 'item-003', idParticipant: 'user-04', part: 1 },
    ],
  },
];

describe('calculatePriceWithServiceTax', () => {
  it('should calculate the price with service tax correctly', () => {
    expect(calculatePriceWithServiceTax('100', '10')).toBe('110.00');
  });

  it('should handle decimal service tax correctly', () => {
    expect(calculatePriceWithServiceTax('200', '7.5')).toBe('215.00');
  });

  it('should return the original price if service tax is empty', () => {
    expect(calculatePriceWithServiceTax('150', '')).toBe('150.00');
  });

  it('should handle zero service tax correctly', () => {
    expect(calculatePriceWithServiceTax('80', '0')).toBe('80.00');
  });
});

describe('getParticipantTotal', () => {

  it('should calculate the total for a participant correctly', () => {
    expect(getParticipantTotal('user-02', itemList)).toBe('25.50');
    expect(getParticipantTotal('user-01', itemList)).toBe('25.50');
  });

  it('should calculate the total for a participant with multiple items correctly', () => {
    expect(getParticipantTotal('user-01', itemsListMultiple)).toBe('35.50');
  });

  it('should return zero total when item list is empty', () => {
    expect(getParticipantTotal('user-01', [])).toBe('0.00');
  });

  it('should return zero total when participant is not found', () => {
    expect(getParticipantTotal('user-03', itemList)).toBe('0.00');
  });
});

describe('getTotalPrice', () => {
  it('should calculate the total price of all items correctly', () => {
    expect(getTotalPrice(itemsListMultiple)).toBe('91.00');
  });

  it('should return zero total when item list is empty', () => {
    expect(getTotalPrice([])).toBe('0.00');
  });
});
