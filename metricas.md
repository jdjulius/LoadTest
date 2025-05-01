# Métricas en Pruebas de Rendimiento con k6

A continuación se describen los tipos de métricas nativas de k6 y otras métricas comunes en pruebas de rendimiento.

---

## 1. Counter

- **Definición**: Métrica acumulativa que solo puede aumentar.
- **Uso típico**:
  - Contar el número total de peticiones realizadas.
  - Registrar el total de errores ocurridos.
- **Características**:
  - No decrece durante la ejecución.
  - Se reinicia al inicio de cada prueba.

## 2. Gauge

- **Definición**: Métrica de valor instantáneo que puede subir o bajar.
- **Uso típico**:
  - Monitorear utilización de CPU o memoria.
  - Número de conexiones activas.
- **Características**:
  - Refleja el estado en un momento dado.
  - Permite capturar picos y valles.

## 3. Rate

- **Definición**: Métrica que calcula la proporción de eventos que cumplen un criterio (por ejemplo, éxito/fallo).
- **Uso típico**:
  - Tasa de peticiones exitosas vs. totales (error rate).
  - Porcentaje de checks que pasan.
- **Características**:
  - Valor entre 0 y 1.
  - Ideal para definir SLAs y abortar pruebas si se excede un umbral.

## 4. Trend

- **Definición**: Métrica de series temporales que registra distribuciones de valores numéricos.
- **Uso típico**:
  - Tiempos de respuesta (latencias).
  - Duración de procesos o transacciones.
- **Características**:
  - Almacena muestras continuas.
  - Permite consultar percentiles (p50, p95, p99).

---

# Otras Métricas y Conceptos Clave

## 5. Throughput

- **Definición**: Cantidad de peticiones completadas por segundo.
- **Importancia**: Mide la capacidad de procesamiento del sistema.

## 6. Latencia y Percentiles

- **Definición**:
  - **Latencia**: tiempo transcurrido hasta que el servidor empieza a responder.
  - **Percentiles**: p50, p90, p95, p99 para analizar la dispersión de latencias.
- **Importancia**: Aísla retrasos de red vs. procesamiento interno.

## 7. Iterations per Second

- **Definición**: Número de veces por segundo que un VU completa el guion de prueba.
- **Importancia**: Indica cuántas transacciones “completas” puede procesar el sistema.

## 8. Concurrency (VUs Activos)

- **Definición**: Número de usuarios virtuales corriendo simultáneamente.
- **Importancia**: Simula carga real de usuarios concurrentes.

## 9. Data Transfer Rate

- **Definición**: Volumen de datos enviados y recibidos por segundo (bytes/s).
- **Importancia**: Útil para detectar cuellos de botella de red o I/O.

## 10. Uso de Recursos del Sistema Bajo Prueba

- **Ejemplos**:
  - CPU (% de uso)
  - Memoria (heap y no-heap)
  - I/O de disco
  - Uso de red
- **Importancia**: Correlacionar métricas de k6 con consumo real de infraestructura.

## 11. Checks vs. Thresholds

- **Checks**: Aserciones que validan el contenido de cada respuesta (status codes, body).
- **Thresholds**: Condiciones globales (por ejemplo, “p95 de latencia < 500 ms”) que determinan si la prueba pasa o falla.

## 12. Modelos de Carga

- **Abierto (Open-Loop)**: Peticiones a tasa fija, sin esperar fin de iteraciones previas.
- **Cerrado (Closed-Loop)**: Cada VU inicia una iteración tras completar la anterior.
- **Importancia**: Elegir según simule mejor la realidad de usuarios o servicios.

---

> Con este conjunto de métricas y conceptos podrás diseñar, ejecutar y analizar pruebas de rendimiento completas con k6, midiendo tanto eventos discretos como tendencias y estados del sistema.
