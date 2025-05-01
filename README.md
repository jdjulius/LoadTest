## ¿Qué es k6?

k6 es una herramienta de pruebas de rendimiento (load testing) **open-source**, diseñada para medir cómo responde un sistema bajo distintos niveles de carga. Fue creada originalmente por la empresa Grafana Labs y se basa en scripts escritos en JavaScript para definir escenarios de prueba.

---

### Características principales

- **Uso de JavaScript**  
  Permite escribir scripts de prueba con la sintaxis y flexibilidad de ES6, facilitando la parametrización, lógica condicional y reutilización de código.

- **Modelado de usuarios virtuales (VUs)**  
  Simula múltiples “usuarios” concurrentes que ejecutan iteraciones de tu script, reproduciendo flujos de navegación o peticiones API.

- **Definición de ramp-up y ramp-down**  
  A través de etapas (stages) controlas cómo aumenta, se mantiene y disminuye la carga de VUs a lo largo del tiempo.

- **Métricas incorporadas**  
  Proporciona métricas clave como tiempos de respuesta (p50, p95, p99), tasas de error, throughput y más, que se pueden combinar con counters, gauges, rates y trends.

- **Thresholds (umbrales)**  
  Permite establecer condiciones de éxito/fallo (por ejemplo, “p95 < 300 ms” o “error rate < 1%”), abortando o marcando la prueba según tus SLAs.

- **Extensible y modular**  
  Puedes importar bibliotecas de helpers HTTP, validaciones, data providers o incluso integrar con módulos externos de Node.js (solo para pre-procesado).

- **Integración CI/CD**  
  Se ejecuta en pipelines de GitHub Actions, Jenkins, GitLab CI, etc., y exporta resultados en formatos JSON, CSV o HTML para dashboards en Grafana/InfluxDB.

- **Ejecución local o en la nube**  
  Aunque se usa ampliamente en CLI para pruebas locales, también existe la opción de k6 Cloud para escalabilidad y colaboración.

---

### Casos de uso típicos

1. **Load Testing**  
   Verificar que tu API o aplicación web maneje el volumen de usuarios esperados durante un lanzamiento.

2. **Stress Testing**  
   Subir la carga hasta encontrar el punto de ruptura y observar comportamiento bajo falla controlada.

3. **Spike Testing**  
   Simular picos repentinos de tráfico (por ejemplo, campañas de marketing) para validar la capacidad de recuperación.

4. **Soak/Endurance Testing**  
   Ejecutar carga constante durante largos periodos para detectar fugas de memoria o degradación progresiva.

5. **Breakpoint/Capacity Testing**  
   Ajustar la carga en escalones finos y definir con precisión la capacidad máxima sostenible.

---

### Ventajas de k6

- Curva de aprendizaje baja para equipos con experiencia en JavaScript.
- API sencilla y clara, con buen balance entre potencia y facilidad de uso.
- Comunidad activa y complementos para visualización de resultados.
- Diseñado para automatización y CI/CD, fomentando pruebas de rendimiento continuas.

---

> En resumen, **k6** es una solución moderna y liviana para realizar pruebas de rendimiento robustas, con un ecosistema rico en métricas y una integración natural en flujos de desarrollo ágiles.

# LoadTest

## comandos de ejecucion

docker run --rm -v C:\Users\Julio\OneDrive\Documentos\GitHub\LoadTest\scripts:/scripts grafana/k6 run /scripts/stages.js

## Exportar datos

docker run --rm -v "C:\Users\Julio\OneDrive\Documentos\GitHub\LoadTest\scripts:/scripts" grafana/k6 run --out json=/scripts/resultados.json /results/breaking-point-detailed.js

## Docker

docker run --rm -v C:/Users/Julio/OneDrive/Documentos/GitHub/LoadTest:/mnt/scripts -w /mnt/scripts grafana/k6 run load.js
