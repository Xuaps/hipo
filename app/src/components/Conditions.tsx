import React, { useState } from 'react';
import {
  calculateTotalInterest,
  loadAmortizationTable,
  Payment,
} from '../model/amortization';
import {
  loadProductsPriceOverTime,
  ProductsPriceOverTime,
} from '../model/product';

const Conditions = ({ amount, months }: { amount: number; months: number }) => {
  const [data, setData] = useState({
    rate: 1.3,
    products_price_by_month: { life: 0, home: 0 },
  });
  const [amortizationTable, setAmortizationTable] = useState<Payment[]>([]);
  const [productsTable, setProductsTable] = useState<ProductsPriceOverTime>({
    life: [],
    home: [],
  });

  const onCalculate = async () => {
    const { rate, products_price_by_month } = data;
    const amortizationTable = loadAmortizationTable(amount, rate, months);
    const productsTable = loadProductsPriceOverTime(
      months,
      products_price_by_month,
    );

    setAmortizationTable(amortizationTable);
    setProductsTable(productsTable);
  };

  return (
    <>
      Rate:
      <input
        step="any"
        type="number"
        name="rate"
        value={data.rate}
        onChange={(e) => setData({ ...data, rate: parseFloat(e.target.value) })}
      />
      Life:
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
      Home:
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
      {amortizationTable.length > 0 && (
        <>
          <div data-testid="total-interest">
            <h1>Total Interest</h1>
            <p>{calculateTotalInterest(amortizationTable)}</p>
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
      <br />
      <br />
      <button onClick={onCalculate}> Calculate </button>
      <br />
      <br />
    </>
  );
};

export default Conditions;
