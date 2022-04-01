import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './i18n';

ReactDOM.render(
  <Suspense fallback="...">{React.createElement(App)}</Suspense>,
  document.getElementById('root'),
);
