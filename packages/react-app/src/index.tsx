// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function enableMocksIfNeeded() {
  if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_E2E !== 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }
}

enableMocksIfNeeded().finally(() => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(<App />);
  reportWebVitals();
});
