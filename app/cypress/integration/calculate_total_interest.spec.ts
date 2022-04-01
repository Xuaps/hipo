describe('calculate total payed interest', () => {
  it('it should return the total interest for amount, time and rate', () => {
    cy.visit('http://localhost:3000');

    setData({ amount: 80000, rate: 1.95, months: 320 });

    totalInterestMustBe(2000);
  });
});

type Data = {
  amount: number;
  rate: number;
  months: number;
};

const setData = ({ amount, rate, months }: Data) => {
  cy.get('input[name="amount"]').type(amount.toString());
  cy.get('input[name="rate"]').type(rate.toString());
  cy.get('input[name="months"]').type(months.toString());
  cy.get('button').click();
};

const totalInterestMustBe = (expected: number) => {
  cy.get('[data-testid="total-interest"]').should(
    'have.text',
    expected.toString(),
  );
};
