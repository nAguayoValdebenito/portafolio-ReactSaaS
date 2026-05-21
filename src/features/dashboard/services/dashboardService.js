import { db } from '../../../services/firebase';
import { collection, query, where, getDocs, orderBy, onSnapshot } from 'firebase/firestore';

export const getEnterpriseKPIs = async (eid) => {
  try {
    const q = query(collection(db, 'kpis'), where('eid', '==', eid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.error('[dashboardService] Index Error: Composite index missing for KPIs query. Check Firebase Console.', error);
    } else if (error.code === 'unavailable') {
      console.error('[dashboardService] Network Error: Firestore is unreachable.', error);
    } else {
      console.error('[dashboardService] Error fetching KPIs:', error);
    }
    throw error;
  }
};

export const getOperationalHistory = async (eid) => {
  try {
    const q = query(
      collection(db, 'registros_operativos'),
      where('eid', '==', eid),
      orderBy('registro_timestamp', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      let formattedDate = '';
      
      if (data.registro_timestamp) {
        // Handle Firestore Timestamp object or standard Date/string
        const dateObj = typeof data.registro_timestamp.toDate === 'function' 
          ? data.registro_timestamp.toDate() 
          : new Date(data.registro_timestamp);
          
        if (!isNaN(dateObj.getTime())) {
          // Format as 'DD/MM' or use standard Intl format
          const day = dateObj.getDate().toString().padStart(2, '0');
          const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
          formattedDate = `${day}/${month}`;
        }
      }

      return {
        id: doc.id,
        ...data,
        formattedDate
      };
    });
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.error('[dashboardService] Index Error: Composite index missing for operational history query. Check Firebase Console.', error);
    } else if (error.code === 'unavailable') {
      console.error('[dashboardService] Network Error: Firestore is unreachable (possibly blocked by client extensions).', error);
    } else {
      console.error('[dashboardService] Error fetching operational history:', error);
    }
    throw error;
  }
};

export const getEnterpriseAuditLogs = async (eid) => {
  try {
    const q = query(
      collection(db, 'audit_logs'),
      where('eid', '==', eid),
      orderBy('log_timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      let formattedTimestamp = '';

      if (data.log_timestamp) {
        const dateObj = typeof data.log_timestamp.toDate === 'function'
          ? data.log_timestamp.toDate()
          : new Date(data.log_timestamp);

        if (!isNaN(dateObj.getTime())) {
          formattedTimestamp = dateObj.toLocaleDateString('es-CL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
        }
      }

      return {
        id: doc.id,
        ...data,
        formattedTimestamp,
      };
    });
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.error('[dashboardService] Index Error: Composite index missing for audit logs query.', error);
    } else if (error.code === 'unavailable') {
      console.error('[dashboardService] Network Error: Firestore is unreachable.', error);
    } else {
      console.error('[dashboardService] Error fetching audit logs:', error);
    }
    throw error;
  }
};

export const getEnterpriseMLModels = async (eid) => {
  try {
    const q = query(
      collection(db, 'modelos_ml'),
      where('eid', '==', eid)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.error('[dashboardService] Index Error: Composite index missing for ML models query.', error);
    } else if (error.code === 'unavailable') {
      console.error('[dashboardService] Network Error: Firestore is unreachable.', error);
    } else {
      console.error('[dashboardService] Error fetching ML models:', error);
    }
    throw error;
  }
};

export const subscribeToEnterpriseAlerts = (eid, callback) => {
  const q = query(
    collection(db, 'alertas'),
    where('eid', '==', eid),
    orderBy('alerta_timestamp', 'desc')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const alerts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(alerts);
  }, (error) => {
    console.error('[dashboardService] Error subscribing to alerts:', error);
  });

  return unsubscribe;
};

export const subscribeToPredictions = (eid, callback) => {
  const q = query(
    collection(db, 'predicciones'),
    where('eid', '==', eid),
    orderBy('timestamp', 'asc')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const predictions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(predictions);
  }, (error) => {
    console.error('[dashboardService] Error subscribing to predictions:', error);
  });

  return unsubscribe;
};
