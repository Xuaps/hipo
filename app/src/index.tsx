import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from './AppInsights';

import './i18n';

ReactDOM.render(
  <Suspense fallback="...">
    {React.createElement(withAITracking(reactPlugin, App))}
  </Suspense>,
  document.getElementById('root'),
);
