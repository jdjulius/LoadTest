# Conceptos Clave en Pruebas de Rendimiento

Más allá de VUs, stages y métricas básicas, estas son otras nociones fundamentales para planificar, ejecutar y analizar pruebas de rendimiento:

---

## 1. VUs (Virtual Users)

- **Definición**  
  VUs son “usuarios virtuales” que simulan el comportamiento de usuarios reales realizando peticiones concurrentes al sistema bajo prueba.

- **Objetivo**  
  Recrear cargas de trabajo simultáneas para medir:

  - Tiempo de respuesta promedio y percentiles.
  - Tasa de errores ante concurrencia.
  - Consumo de recursos (CPU, memoria, red).

- **Características**

  - Cada VU ejecuta el mismo flujo de acciones (script).
  - Se pueden configurar en número fijo o variable a lo largo del test.
  - Su comportamiento puede incluir pausas (think time) para simular tiempos de lectura o espera del usuario.

- **Impacto en el Test**
  - A mayor cantidad de VUs, mayor presión sobre la aplicación.
  - Permiten reproducir escenarios de carga, estrés o resistencia según el objetivo de la prueba.

---

## 2. Stages (Etapas de Carga)

- **Definición**  
  Las **stages** son fases temporales que definen cómo varía el número de VUs durante la prueba.

- **Objetivo**  
  Controlar de forma precisa la rampa de carga:

  - **Ramp-up**: incremento gradual de VUs hasta un nivel objetivo.
  - **Steady-state**: mantenimiento de la carga máxima deseada.
  - **Ramp-down**: disminución ordenada de VUs al final de la prueba.

- **Características**

  - Cada stage se describe por dos parámetros: **duración** y **objetivo de VUs**.
  - Permiten simular escenarios realistas de subida, estabilización y bajada de tráfico.
  - Facilitan la identificación de puntos de ruptura y de recuperación al cambiar la carga.

- **Impacto en el Test**
  - Un diseño de stages bien planteado ayuda a:
    - Verificar la capacidad de escalado del sistema.
    - Observar degradación progresiva bajo estrés.
    - Evaluar tiempos de calentamiento y enfriamiento de recursos.

---

> **Resumen**
>
> - Los **VUs** representan la concurrencia de usuarios simulados.
> - Las **stages** definen cómo evoluciona esa concurrencia a lo largo del tiempo.
>
> Combinando ambos conceptos, puedes diseñar pruebas que reproduzcan desde cargas constantes hasta escenarios de estrés controlado y recuperación, obteniendo métricas clave para garantizar la robustez y escalabilidad de tu sistema.

## 3. Throughput

- **Definición**: Número de peticiones completadas por unidad de tiempo (por ejemplo, requests/segundo).
- **Importancia**: Mide la capacidad global del sistema para procesar carga; ayuda a dimensionar infraestructura.

---

## 4. Latencia vs. Tiempo de Respuesta

- **Latencia**: Retardo inicial antes de que el servidor empiece a procesar la petición.
- **Tiempo de Respuesta**: Tiempo total desde que se envía la petición hasta que se recibe la respuesta completa.
- **Relevancia**: Diferenciar ambos permite aislar demoras de red frente a procesamiento interno.

---

## 5. Modelos de Carga: Abiertos vs. Cerrados

- **Modelo Cerrado (Closed-loop)**: Cada VU inicia una nueva iteración sólo cuando termina la anterior.
- **Modelo Abierto (Open-loop)**: Peticiones generadas a una tasa fija, independientemente de cuándo terminen iteraciones previas (arrival rate).
- **Uso**: Elige cerrado para simular usuarios “humanos” que esperan, y abierto para flujos continuos como APIs.

---

## 6. Think Time / Pausas

- **Definición**: Intervalos de espera simulados entre acciones de un VU, para imitar el comportamiento humano.
- **Beneficio**: Aporta realismo a la carga y evita picos artificialmente concentrados.

---

## 7. Checks vs. Thresholds

- **Checks**: Aserciones que validan contenido o estado en cada petición (por ejemplo, código HTTP 200).
- **Thresholds**: Condiciones globales que, si se incumplen (p. ej. p95 > 500 ms o error rate > 1%), marcan la prueba como fallida.
- **Aplicación**: Combinar ambos para asegurar tanto correcto funcionamiento como cumplimiento de SLAs.

---

## 8. Scenarios / Executors

- **Concepto**: Tipos de ejecutores adaptados a distintos patrones de carga (ramping-vus, constant-arrival-rate, shared-iterations, etc.).
- **Ventaja**: Permiten simular simultáneamente distintos perfiles de tráfico (por ejemplo, usuarios navegando vs. APIs batch).

---

## 9. Warm-up y Cool-down

- **Warm-up**: Periodo inicial para “calentar” cachés, conexiones y JVM/GC antes de recoger métricas oficiales.
- **Cool-down**: Fase final de desaceleración donde se toleran latencias crecientes sin contaminar datos críticos.

---

## 10. Baselines y Pruebas de Regresión

- **Baseline**: Conjunto de métricas de referencia obtenidas en un momento estable de la aplicación.
- **Regresión**: Comparar ejecuciones nuevas contra baseline para detectar degradaciones de rendimiento.

---

## 11. Monitoreo de Recursos del SUT

- **Ítems**: CPU, memoria, I/O de disco, uso de red, conexiones de base de datos.
- **Objetivo**: Correlacionar métricas de k6 con consumo del sistema para localizar cuellos de botella.

---

## 12. SLA / SLO / Error Budget

- **SLA (Service Level Agreement)**: Acuerdo formal de niveles de servicio (ej. 99.9% de peticiones < 300 ms).
- **SLO (Service Level Objective)**: Objetivos internos que orientan la definición de thresholds.
- **Error Budget**: Margen permitido de incumplimientos antes de que se considere una regresión crítica.

---

## 13. Capacitación de Infraestructura (Capacity Planning)

- **Propósito**: Determinar cuántos servidores, contenedores o instancias se requieren para soportar distintas cargas.
- **Método**: Usar escenarios de load/scale-out coordinados con despliegues de recursos.

---

## 14. Análisis de Cuellos de Botella

- **Técnicas**: Profiling de CPU, análisis de heap dumps, trazas de red.
- **Resultado**: Identificar el componente (DB, cache, CPU, GC) que limita el rendimiento.

---

## 15. Datos Parametrizados / Correlación

- **Parametrización**: Uso de datos dinámicos (IDs, tokens, payloads) para evitar cacheos artificiales.
- **Correlación**: Extraer valores de respuestas previas para peticiones subsecuentes, garantizando flujos reales.

---

## 16. Distribución Geográfica / Distribución de Carga

- **Concepto**: Ejecutar VUs desde diferentes regiones o nodos para simular usuarios globales.
- **Beneficio**: Valida latencias internacionales y desempeño de CDN o balanceadores de carga.

---

> Estos conceptos ampliarán tu comprensión de las pruebas de rendimiento más allá de la simple generación de carga, ayudándote a diseñar, interpretar y optimizar escenarios completos con k6.
