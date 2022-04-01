import React, { Suspense } from 'react';
import 'regenerator-runtime';
import mixpanel from 'mixpanel-browser';
import ReactDOM from 'react-dom';
import App from './components/App';
import './i18n';

mixpanel.init('41dc75713862b8d3691e99fcabf57c0d', {
  debug: process.env.DEGUB === 'true',
});
mixpanel.track('App Loaded');
ReactDOM.render(
  <Suspense fallback="...">{React.createElement(App)}</Suspense>,
  document.getElementById('root'),
);
