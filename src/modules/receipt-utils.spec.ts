import { calculatePriceWithServiceTax } from "./receipt-utils.ts"

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
