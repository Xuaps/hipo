import React, { useState } from 'react';
import Conditions from './Conditions';

const App = () => {
  const [data, setData] = useState({
    amount: 80000,
    months: 240,
    conditions: 1,
  });

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
      <br />
      <br />
      {range(data.conditions).map((i) => (
        <Conditions key={i} months={data.months} amount={data.amount} />
      ))}
    </div>
  );
};

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
export default App;
