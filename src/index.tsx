import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './views/App';
import init, { setup } from '@rustlib';

init().then(() => {
  setup();
  const container = document.getElementById('root');
  if (!container) {
    console.error('Could not find root container');
    return;
  }
  const root = createRoot(container);
  root.render(<App />);
});
