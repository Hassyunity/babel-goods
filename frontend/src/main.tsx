import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const wakeUpBackend = async () => {
  const BACKEND_URL = "https://babel-goods-api.onrender.com/";
  try {
    await fetch(`${BACKEND_URL}/healthcheck`, { cache: "no-cache" });
    console.log("✅ Backend réveillé !");
  } catch (err) {
    console.warn("⚠️ Backend injoignable :", err);
  }
};

wakeUpBackend();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
