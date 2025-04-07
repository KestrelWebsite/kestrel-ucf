import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from './pages/routes';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
