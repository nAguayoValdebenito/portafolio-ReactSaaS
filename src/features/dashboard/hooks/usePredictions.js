import { useState, useEffect } from 'react';
import { subscribeToPredictions } from '../services/dashboardService';

export const usePredictions = (eid) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eid) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const unsubscribe = subscribeToPredictions(eid, (docs) => {
      try {
        const formattedData = [];
        let lastHistoricalPoint = null;

        docs.forEach((doc) => {
          let timeString = '';
          if (doc.timestamp) {
            const dateObj = typeof doc.timestamp.toDate === 'function' 
              ? doc.timestamp.toDate() 
              : new Date(doc.timestamp);
            if (!isNaN(dateObj.getTime())) {
              // Formatting as HH:MM for time-series charts
              timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
          }

          // We assume 'isForecast' boolean in DB separates past from future.
          // Alternatively, presence of actual vs predicted fields.
          const isForecast = doc.isForecast === true || doc.predictedValue !== undefined;
          
          let dataPoint = {
            id: doc.id,
            timestamp: timeString || doc.timestamp,
            actualValue: !isForecast ? (doc.actualValue ?? doc.value) : null,
            predictedValue: isForecast ? (doc.predictedValue ?? doc.value) : null,
            p90_upper: isForecast ? (doc.p90_upper ?? doc.p90) : null,
            p10_lower: isForecast ? (doc.p10_lower ?? doc.p10) : null,
          };

          if (!isForecast) {
            lastHistoricalPoint = dataPoint;
          } else if (lastHistoricalPoint && lastHistoricalPoint.predictedValue === null) {
            // Seam connection:
            // Where "actualValue" ends (the present), the "predictedValue" begins (the future)
            // with a seamless visual connection by assigning the last actual point as the start of the prediction
            lastHistoricalPoint.predictedValue = lastHistoricalPoint.actualValue;
          }

          formattedData.push(dataPoint);
        });

        setData(formattedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error formatting prediction data", err);
        setError(err);
        setIsLoading(false);
      }
    });

    // Cleanup listener on unmount or eid change to prevent memory leaks
    return () => unsubscribe();
  }, [eid]);

  return { data, isLoading, error };
};
