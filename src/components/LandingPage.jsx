import React, { useState } from "react";
import axios from 'axios';
import { Button, Input } from "@nextui-org/react";
export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseDataHTML, setResponseDataHTML] = useState([]);
  const [validationResults, setValidationResults] = useState({ errorSummary: [] });
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');

  const handleValidationClick = async () => {
    setIsLoading(true);
    setError(null);
    setResponseDataHTML([]);
    setValidationResults({ errorSummary: [] });

    try {
      const responseHTML = await axios.post('http://localhost:3005/api/validate-html', { endpoint: url });
      const responseCSS = await axios.post('http://localhost:3005/api/validate-css', { url: url });
      setResponseDataHTML(Array.isArray(responseHTML.data) ? responseHTML.data : []);
      setResponseDataHTML(responseHTML.data);
      setValidationResults(responseCSS.data); 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

    const renderValidationResultsHTML = (data) => {
      if (data && data.length > 0) {
        return (
          <>
            <h2 className="text-6xl text center">Errores en HTML</h2>
            <ul>
              {data.map((error, index) => (
                <li key={`html-error-${index}`}>
                  <strong>Mensaje:</strong> {error.message}<br />
                  <strong>Extracto:</strong> {error.extract}<br />
                </li>
              ))}
            </ul>
          </>
        );
      } else {
        return <p>No se encontraron errores en HTML.</p>;
      }
    };
  
    const renderValidationResultsCSS = (errorSummary) => {
      const hasCSSIssues = Array.isArray(errorSummary) && errorSummary.some(rule => rule.count > 0);
  
      if (hasCSSIssues) {
        return (
          <>
            <h2 className="text-6xl text center">Errores en CSS</h2>
            <ul>
              {errorSummary.map((rule, index) => (
                <li key={`css-rule-${index}`}>
                  <strong>Regla:</strong> {rule.rule}<br />
                  <strong>Recuento:</strong> {rule.count}
                </li>
              ))}
            </ul>
          </>
        );
      } else {
        return <p>No se encontraron errores en CSS.</p>;
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full mt-[5rem] max-w-6xl p-8 space-y-3 rounded-xl bg-white shadow-lg">
          <Input
            className="w-full px-4 py-2 border rounded-md"
            type="text"
            color="su"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            className="w-full px-4 py-2 text-white bg-success rounded-md hover:bg-success-500"
            onClick={handleValidationClick}
            disabled={isLoading || !url}
          >
            {isLoading ? "Cargando..." : "Validar HTML y CSS"}
          </Button>
          {error && <div className="mt-4 p-8 text-center text-red-500">{error}</div>}
          {!isLoading && !error && (
            <div className="mt-4">
              {renderValidationResultsHTML(responseDataHTML)}
              {renderValidationResultsCSS(validationResults.errorSummary)}
            </div>
          )}
        </div>
      </div>
    );    
}
  
