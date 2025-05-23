import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Start MSW in dev (but not in E2E), but don't block app rendering
if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_E2E !== 'true'
) {
  import('./mocks/browser').then(({ worker }) => worker.start());
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
reportWebVitals();