import React, { useState } from 'react';
import {
  calculateTotalInterest,
  loadAmortizationTable,
  Payment,
} from '../model/amortization';

const App = () => {
  const [data, setData] = useState({ amount: 80000, rate: 1.3, months: 240 });
  const [amortizationTable, setAmortizationTable] = useState<Payment[]>([]);

  const onCalculate = async () => {
    const { amount, rate, months } = data;
    const amortizationTable = loadAmortizationTable(amount, rate, months);
    setAmortizationTable(amortizationTable);
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
        step="any"
        type="number"
        name="rate"
        value={data.rate}
        onChange={(e) => setData({ ...data, rate: parseFloat(e.target.value) })}
      />
      <input
        type="number"
        name="months"
        value={data.months}
        onChange={(e) => setData({ ...data, months: parseInt(e.target.value) })}
      />
      <button onClick={onCalculate}> Calculate </button>
      {amortizationTable.length > 0 && (
        <div data-testid="total-interest">
          <h1>Total Interest</h1>
          <p>{calculateTotalInterest(amortizationTable)}</p>
        </div>
      )}
    </div>
  );
};

export default App;
