import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // With strict mode:
  // <StrictMode>
  //   <App />
  // </StrictMode>

  // Without strict mode
  <App />
);
