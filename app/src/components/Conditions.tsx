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

type ConditionsData = {
  rate: number;
  products_price_by_month: { [key: string]: number };
};

const Conditions = ({ amount, months }: { amount: number; months: number }) => {
  const [data, setData] = useState<ConditionsData>({
    rate: 0,
    products_price_by_month: { life: 0, home: 0 },
  });
  const [amortizationTable, setAmortizationTable] = useState<Payment[]>([]);
  const [productsTable, setProductsTable] = useState<ProductsPriceOverTime>({
    life: [],
    home: [],
  });

  const onChange = async (data: ConditionsData) => {
    setData(data);

    if (!amount || !months) return;
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
        onChange={(e) =>
          onChange({ ...data, rate: parseFloat(e.target.value) })
        }
      />
      Life:
      <input
        step="any"
        type="number"
        name="life"
        value={data.products_price_by_month.life}
        onChange={(e) =>
          onChange({
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
          onChange({
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
    </>
  );
};

export default Conditions;
