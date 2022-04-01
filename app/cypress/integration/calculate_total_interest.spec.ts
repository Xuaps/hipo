describe('calculate total payed interest', () => {
  it('it should return the total interest for amount, time and rate', () => {
    cy.visit('http://localhost:3000');

    setData({ amount: 80000, rate: 1.3, months: 240 });

    totalInterestMustBe(10893.242131806644);
  });
});

type Data = {
  amount: number;
  rate: number;
  months: number;
};

const setData = ({ amount, rate, months }: Data) => {
  cleanBoxes();
  cy.get('input[name="amount"]').type(amount.toString());
  cy.get('input[name="rate"]').type(rate.toString());
  cy.get('input[name="months"]').type(months.toString());
  cy.get('button').click();
};

const cleanBoxes = () => {
  cy.get('input[name="amount"]').clear();
  cy.get('input[name="rate"]').clear();
  cy.get('input[name="months"]').clear();
};

const totalInterestMustBe = (expected: number) => {
  cy.get('[data-testid="total-interest"]').should(
    'contain.text',
    expected.toString(),
  );
};
