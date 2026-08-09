# PredictiveSaaS

Plataforma web (SaaS) de analítica industrial y mantenimiento predictivo, orientada a empresas que necesitan monitorear KPIs operativos, visualizar pronósticos de sus modelos de Machine Learning y gestionar la integración de sus fuentes de datos, todo desde un panel centralizado.

**Versión:** 1.0

---

## Índice

- [Objetivo del proyecto](#objetivo-del-proyecto)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura general](#arquitectura-general)
- [Autenticación y multi-tenant](#autenticación-y-multi-tenant)
- [Módulos del Dashboard](#módulos-del-dashboard)
- [Seguridad](#seguridad)
- [Estructura del proyecto](#estructura-del-proyecto)

---

## Objetivo del proyecto

PredictiveSaaS busca resolver un problema común en empresas industriales: los datos operativos (producción, fallas, sensores) suelen estar dispersos en distintos sistemas y no se traducen en decisiones oportunas. La plataforma centraliza esa información y la conecta con modelos predictivos, permitiendo:

| Necesidad del negocio | Solución en la plataforma |
|---|---|
| Ver el estado operativo actual de un vistazo | Dashboard con KPIs y alertas en tiempo real |
| Anticipar comportamientos futuros (fallas, eficiencia) | Módulo de Analítica Predictiva con modelos ML |
| Conectar distintas fuentes de datos de la empresa | Módulo de Integración de Datos |
| Mantener trazabilidad y control de acceso | Registro de auditoría y reglas de seguridad multi-tenant |

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Framework frontend | React 19 + Vite |
| Enrutamiento | React Router DOM v7 |
| Estilos | Tailwind CSS |
| Gráficos | Recharts |
| Iconografía | Lucide React |
| Backend / Base de datos | Firebase (Authentication, Firestore, App Check) |
| Linting | ESLint |

---

## Arquitectura general

El proyecto sigue una organización por **features** (`src/features`), separando la aplicación en tres grandes dominios: `landing`, `auth` y `dashboard`. Cada dominio agrupa sus propios componentes, vistas, hooks y servicios, lo que facilita mantener el código ordenado a medida que crece.

Las rutas principales se gestionan en `App.jsx` mediante `react-router-dom`, utilizando **carga diferida (`React.lazy`)** para los módulos de autenticación y dashboard. Esto significa que el código de esas secciones solo se descarga cuando el usuario realmente las visita, mejorando el tiempo de carga inicial de la aplicación.

Además, se definen títulos de pestaña dinámicos según la ruta activa (`RouteTitleTracker`) y una pantalla de carga (`skeleton`) mientras se resuelven los módulos diferidos.

---

## Autenticación y multi-tenant

La autenticación se maneja con **Firebase Authentication**, envuelta en un `AuthContext` que centraliza el estado del usuario en toda la aplicación.

**Flujo de registro (`Register.jsx`):**
1. Se crea el usuario en Firebase Authentication.
2. Se genera un identificador único de empresa (`eid`) para ese usuario, ya que la plataforma es **multi-tenant**: cada empresa registrada tiene sus propios datos completamente aislados del resto.
3. Se crean simultáneamente (mediante un `batch` de Firestore) el documento de la empresa y el documento del usuario, evitando así estados intermedios inconsistentes: si algo falla en este paso, el usuario recién creado se elimina automáticamente.
4. Se envía un correo de verificación antes de permitir el acceso completo al panel.

**Protección de rutas (`ProtectedRoute.jsx`):** antes de mostrar el dashboard, se valida que exista sesión activa, que el correo esté verificado y que el perfil del usuario se haya cargado correctamente desde Firestore. Mientras esto ocurre, se muestra una interfaz de carga (*skeleton*) que simula la estructura real del panel, evitando parpadeos visuales.

---

## Módulos del Dashboard

### Overview — Vista operativa general
Presenta las tarjetas de KPIs principales de la empresa, un gráfico de desempeño histórico versus metas, y un panel de alertas inteligentes en tiempo real (con filtro por nivel de criticidad). Los datos de KPIs e historial se cargan de forma asíncrona, y las alertas se sincronizan en vivo mediante `onSnapshot` de Firestore.

### Analytics Workspace — Analítica predictiva
Es el módulo central de Machine Learning. Permite:
- Visualizar un **gráfico de proyección** que conecta el historial real con la predicción futura del modelo (incluyendo bandas de confianza p90/p10).
- Consultar una tabla de **modelos ML entrenados**, con su estado (activo, entrenando, inactivo) y su nivel de precisión.
- Ver un panel de **factores de influencia**, que muestra qué variables impactan más en la predicción.
- Abrir un asistente para **entrenar un nuevo modelo** (selección de algoritmo, métrica objetivo y carga de dataset).
- Gestionar un modelo existente (reentrenar, descargar artefactos o desactivarlo).

El hook `usePredictions` se encarga de transformar los datos crudos de Firestore en una serie temporal continua, empalmando el último punto real con el inicio de la proyección para que el gráfico se vea como una sola línea continua entre pasado y futuro.

### Data Integration — Integración de fuentes de datos
Permite visualizar y configurar las conexiones activas de la empresa con distintas fuentes externas (PostgreSQL, CSV, APIs de ERP, almacenamiento en la nube), mostrando su estado de conexión y última sincronización. Incluye además una **tabla de auditoría** con el historial de acciones relevantes (inicios de sesión, sincronizaciones, exportaciones, cambios de esquema), junto con el usuario, fecha y dirección IP asociada a cada evento.

---

## Seguridad

- **Aislamiento multi-tenant a nivel de base de datos:** las reglas de Firestore (`firestore.rules`) bloquean por defecto cualquier lectura o escritura no autenticada. Para las colecciones corporativas (KPIs, alertas, modelos ML, predicciones, registros operativos, logs de auditoría), se exige que el `eid` del usuario coincida exactamente con el `eid` del documento que intenta leer o modificar. Esto garantiza que ninguna empresa pueda acceder a los datos de otra, incluso si conociera el identificador del documento.
- **App Check:** se integra `ReCaptchaV3Provider` para verificar que las solicitudes provienen de la aplicación legítima y no de scripts automatizados.
- **Sanitización de entradas (`sanitizer.js`):** los campos de texto ingresados por el usuario (nombre de empresa, nombre de usuario) se limpian antes de guardarse en Firestore, eliminando caracteres que podrían usarse para ataques de tipo XSS y limitando su longitud máxima.
- **Manejo de errores traducido (`firebaseErrors.js`):** los códigos de error técnicos de Firebase se convierten en mensajes claros y en español para el usuario final, sin revelar detalles internos del sistema.

---

## Estructura del proyecto

```
src/
├── App.jsx                    # Enrutamiento principal y carga diferida de módulos
├── components/                # Componentes reutilizables (Button, InputField, ErrorBoundary)
├── context/                   # Contextos globales (Auth, Toast/notificaciones)
├── services/                  # Configuración e inicialización de Firebase
├── utils/                     # Utilidades (sanitización, traducción de errores)
└── features/
    ├── landing/                # Página pública de presentación del producto
    ├── auth/                   # Login, registro, recuperación de contraseña, rutas protegidas
    └── dashboard/
        ├── views/               # Overview, Analytics Workspace, Data Integration
        ├── components/          # Gráficos y layout del panel
        ├── hooks/                # Lógica de transformación de datos (predicciones)
        └── services/             # Consultas y suscripciones a Firestore
```
