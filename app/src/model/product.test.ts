import { loadProductsPriceOverTime } from './product';

describe('Product prices', () => {
  it('should calculate the acummulated proce table over time', () => {
    const prices = loadProductsPriceOverTime(4, { home: 2, life: 4 });
    expect(prices['home']).toEqual([2, 4, 6, 8]);
    expect(prices['life']).toEqual([4, 8, 12, 16]);
  });
});
