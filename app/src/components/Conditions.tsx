import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
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

const Conditions = ({
  id,
  amount,
  months,
}: {
  id: string | number;
  amount: number;
  months: number;
}) => {
  const [data, setData] = useLocalStorageState<ConditionsData>(
    `conditions-${id}`,
    {
      ssr: false,
      defaultValue: {
        rate: 0,
        products_price_by_month: { life: 0, home: 0 },
      },
    },
  );
  const amortizationTable: Payment[] =
    !!amount && !!months
      ? loadAmortizationTable(amount, data.rate, months)
      : [];
  const productsTable: ProductsPriceOverTime =
    !!amount && !!months
      ? loadProductsPriceOverTime(months, data.products_price_by_month)
      : { life: [], home: [] };

  const onChange = async (data: ConditionsData) => {
    setData(data);
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
