import React from 'react';

const App = () => {
  return (
    <div>
      <input type="text" name="amount" />
      <input type="text" name="rate" />
      <input type="text" name="months" />
      <button> Calculate </button>
      <div data-testid="total-interest">
        <h1>Total Interest</h1>
        <p>0$</p>
      </div>
    </div>
  );
};

export default App;
