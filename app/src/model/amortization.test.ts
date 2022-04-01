import { calculateTotalInterest, loadAmortizationTable } from './amortization';

describe('Amortization table generation', () => {
  it('should generate amortization table for a fixed rate', () => {
    const table = loadAmortizationTable(80000, 1.3, 240);
    expect(table).toHaveLength(240);
    expect(
      table.filter(
        (payment) =>
          payment.principal.toFixed(2) !== aPayment().principal.toFixed(2),
      ),
    ).toStrictEqual([]);
    expect(table[0]).toStrictEqual(aPayment());
  });
});

describe('Amortization table operations', () => {
  it('should return the total interest payed', () => {
    const table = [aPayment(), aPayment(), aPayment()];

    expect(calculateTotalInterest(table)).toStrictEqual(table[0].interest * 3);
  });
});

const aPayment = () => ({
  month: 0,
  rate: 1.3,
  payment: 292.0551755491971,
  interest: 86.66666666666666,
  principal: 378.7218422158638,
  balance: 79707.94482445081,
});
