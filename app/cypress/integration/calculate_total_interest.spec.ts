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

    cleanMonths();
    setMonths(120);

    totalInterestWithoutProductsMustBe(5355.899526211467);
    totalInterestWithAllProductsMustBe(10875.899526211466);
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
  setMonths(months);
  cy.get('input[name="rate"]').type(rate.toString());
  cy.get('input[name="life"]').type(products_price_by_month.life.toString());
  cy.get('input[name="home"]').type(products_price_by_month.home.toString());
};

const setMonths = (months: number) => {
  cy.get('input[name="months"]').type(months.toString());
};

const cleanBoxes = () => {
  cy.get('input[name="amount"]').clear();
  cy.get('input[name="rate"]').clear();
  cleanMonths();
  cy.get('input[name="life"]').clear();
  cy.get('input[name="home"]').clear();
};

const cleanMonths = () => {
  cy.get('input[name="months"]').clear();
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
