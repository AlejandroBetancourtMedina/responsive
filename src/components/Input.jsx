// Input.jsx

import React, { useState } from "react";
import axios from 'axios';

export default function Input() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseDataHTML, setResponseDataHTML] = useState(null);
  const [responseDataCSS, setResponseDataCSS] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');

  const handleValidationClick = async () => {
    setIsLoading(true);
    try {
      const responseHTML = await axios.post('http://localhost:3005/api/validate-html', { endpoint: url });
      const responseCSS = await axios.post('http://localhost:3005/api/validate-css', { url: url });
      setResponseDataHTML(responseHTML.data);
      setResponseDataCSS(responseCSS.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleValidationClick} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Validar HTML y CSS"}
      </button>
      <div>
        {responseDataHTML && responseDataCSS && (
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Resultados de la validación de HTML</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Resultados de la validación de CSS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <pre>{JSON.stringify(responseDataHTML, null, 2)}</pre>
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <pre>{JSON.stringify(responseDataCSS, null, 2)}</pre>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {error && <div>Error: {error}</div>}
    </div>
  );
}
