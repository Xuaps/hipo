describe('calculate total payed interest', () => {
  it('it should return the total interest for amount, time and rate', () => {
    cy.visit('http://localhost:3000');

    setData({
      amount: 80000,
      months: 240,
      rate: 1.3,
      products_price_by_month: { home: 18, life: 28 },
    });

    totalInterestWithoutProductsMustBe(10893.242131806644);
    totalInterestWithAllProductsMustBe(21933.242131806644);
  });
});

type Data = {
  amount: number;
  months: number;
  rate: number;
  products_price_by_month: { [key: string]: number };
};

const setData = ({ amount, months, rate, products_price_by_month }: Data) => {
  cleanBoxes();
  cy.get('input[name="amount"]').type(amount.toString());
  cy.get('input[name="months"]').type(months.toString());
  cy.get('input[name="rate"]').type(rate.toString());
  cy.get('input[name="life"]').type(products_price_by_month.life.toString());
  cy.get('input[name="home"]').type(products_price_by_month.home.toString());
  cy.get('button').click();
};

const cleanBoxes = () => {
  cy.get('input[name="amount"]').clear();
  cy.get('input[name="rate"]').clear();
  cy.get('input[name="months"]').clear();
  cy.get('input[name="life"]').clear();
  cy.get('input[name="home"]').clear();
};

const totalInterestWithoutProductsMustBe = (expected: number) => {
  cy.get('[data-testid="total-interest"]').should(
    'contain.text',
    expected.toString(),
  );
};

const totalInterestWithAllProductsMustBe = (expected: number) => {
  cy.get('[data-testid="total-interest-all"]').should(
    'contain.text',
    expected.toString(),
  );
};
