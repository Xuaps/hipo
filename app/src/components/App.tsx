import React, { useState } from 'react';
import {
  calculateTotalInterest,
  loadAmortizationTable,
  Payment,
} from '../model/amortization';
import {
  ProductsPriceOverTime,
  loadProductsPriceOverTime,
} from '../model/product';

const App = () => {
  const [data, setData] = useState({
    amount: 80000,
    months: 240,
    rate: 1.3,
    products_price_by_month: { life: 0, home: 0 },
  });
  const [amortizationTable, setAmortizationTable] = useState<Payment[]>([]);
  const [productsTable, setProductsTable] = useState<ProductsPriceOverTime>({
    life: [],
    home: [],
  });

  const onCalculate = async () => {
    const { amount, months, rate, products_price_by_month } = data;
    const amortizationTable = loadAmortizationTable(amount, rate, months);
    const productsTable = loadProductsPriceOverTime(
      months,
      products_price_by_month,
    );

    setAmortizationTable(amortizationTable);
    setProductsTable(productsTable);
  };

  return (
    <div>
      <br />
      <br />
      <input
        type="number"
        name="amount"
        value={data.amount}
        onChange={(e) => setData({ ...data, amount: parseInt(e.target.value) })}
      />
      <input
        type="number"
        name="months"
        value={data.months}
        onChange={(e) => setData({ ...data, months: parseInt(e.target.value) })}
      />
      <input
        step="any"
        type="number"
        name="rate"
        value={data.rate}
        onChange={(e) => setData({ ...data, rate: parseFloat(e.target.value) })}
      />
      <input
        step="any"
        type="number"
        name="life"
        value={data.products_price_by_month.life}
        onChange={(e) =>
          setData({
            ...data,
            products_price_by_month: {
              ...data.products_price_by_month,
              life: parseFloat(e.target.value),
            },
          })
        }
      />
      <input
        step="any"
        type="number"
        name="home"
        value={data.products_price_by_month.home}
        onChange={(e) =>
          setData({
            ...data,
            products_price_by_month: {
              ...data.products_price_by_month,
              home: parseFloat(e.target.value),
            },
          })
        }
      />
      <button onClick={onCalculate}> Calculate </button>
      {amortizationTable.length > 0 && (
        <>
          <div data-testid="total-interest">
            <h1>Total Interest</h1>
            <p>{calculateTotalInterest(amortizationTable)}</p>
          </div>
          <div data-testid="total-interest-life">
            <h1>Total Interest + Life insurance</h1>
            <p>
              {calculateTotalInterest(amortizationTable) +
                productsTable['life'][productsTable['life'].length - 1]}
            </p>
          </div>
          <div data-testid="total-interest-home">
            <h1>Total Interest + Home insurance</h1>
            <p>
              {calculateTotalInterest(amortizationTable) +
                productsTable['home'][productsTable['home'].length - 1]}
            </p>
          </div>
          <div data-testid="total-interest-all">
            <h1>Total Interest + Both Products</h1>
            <p>
              {calculateTotalInterest(amortizationTable) +
                productsTable['life'][productsTable['life'].length - 1] +
                productsTable['home'][productsTable['home'].length - 1]}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
