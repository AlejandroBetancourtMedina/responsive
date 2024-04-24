// webVitals.js
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics({ name, delta, id }) {
  // Enviar métricas a tu backend o servicio de análisis
  console.log(`${name} value is ${delta}`);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
