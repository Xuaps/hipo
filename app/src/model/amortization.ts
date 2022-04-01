export type Payment = {
  month: number;
  rate: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
};

export const loadAmortizationTable = (
  amount: number,
  rate: number,
  months: number,
): Payment[] => {
  const totalMonths = new Array(months).fill(0).map((_, i) => i);
  const rateByMonth = rate / 12;

  return totalMonths.reduce((acc: Payment[], curr: number) => {
    const previousBalance = acc[curr - 1]?.balance || amount;
    const monthsLeft = months - curr;
    const applicableRate = 1 - Math.pow(1 + rateByMonth / 100, -monthsLeft);
    const principal = previousBalance / (applicableRate / (rateByMonth / 100));
    const interest = previousBalance * (rateByMonth / 100);
    const payment = principal - interest;
    const balance = previousBalance - payment;

    return [
      ...acc,
      buildPayment(curr, rate, payment, interest, principal, balance),
    ];
  }, []);
};

const buildPayment = (
  month: number,
  rate: number,
  payment: number,
  interest: number,
  principal: number,
  balance: number,
): Payment => ({
  month,
  rate,
  payment,
  interest,
  principal,
  balance,
});

export const calculateTotalInterest = (
  amortizationTable: Payment[],
): number => {
  return amortizationTable.reduce((acc: number, curr: Payment) => {
    return acc + curr.interest;
  }, 0);
};
