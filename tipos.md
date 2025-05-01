# Tipos de Pruebas de Rendimiento con k6

Cuando utilizamos k6 para evaluar la **capacidad** y **robustez** de un sistema, normalmente distinguimos varios tipos de pruebas de rendimiento. A continuación se describen sus características principales, sin entrar en ejemplos de código.

---

## 1. Pruebas de Carga (Load Testing)

- **Objetivo**  
  Verificar que el sistema soporte la carga esperada en producción.

- **Qué mide**

  - Tiempos de respuesta bajo condiciones nominales.
  - Consumo de CPU, memoria y otros recursos.

- **Implementación conceptual**  
  Se ejecuta con un número constante de usuarios virtuales durante un periodo fijo, reproduciendo el flujo habitual de la aplicación.

---

## 2. Pruebas de Estrés (Stress Testing)

- **Objetivo**  
  Determinar el punto hasta el cual el sistema puede escalar antes de fallar.

- **Qué mide**

  - Límite máximo de concurrencia de usuarios.
  - Cómo se degradan la latencia y la tasa de errores a medida que aumenta la carga.

- **Implementación conceptual**  
  Se eleva progresivamente la carga (usuarios o peticiones por segundo) hasta que el sistema comience a devolver errores o tiempos de respuesta inaceptables.

---

## 3. Pruebas de Picos (Spike Testing)

- **Objetivo**  
  Evaluar la capacidad de recuperación del sistema ante subidas bruscas de carga.

- **Qué mide**

  - Impacto inmediato en latencia y errores.
  - Tiempo que tarda en volver a niveles estables tras el pico.

- **Implementación conceptual**  
  Se alterna entre un nivel bajo de carga y un pico súbito muy por encima de lo habitual, observando la recuperación.

---

## 4. Pruebas de Resistencia / Soak (Endurance Testing)

- **Objetivo**  
  Comprobar la estabilidad y ausencia de fugas de recursos bajo una carga moderada durante un largo periodo.

- **Qué mide**

  - Fugas de memoria o recursos acumulativas.
  - Degradación paulatina del rendimiento (si la hubiera).

- **Implementación conceptual**  
  Mantener una carga constante durante horas o días, monitoreando tendencias en uso de memoria, CPU y latencias.

---

## 5. Pruebas de Punto de Ruptura (Breakpoint Testing)

- **Objetivo**  
  Localizar el umbral exacto en el cual el sistema deja de operar dentro de los parámetros aceptables.

- **Qué mide**

  - Nivel de concurrencia o tasa de peticiones donde los errores superan un umbral predefinido.
  - Dónde p95 o p99 empiezan a superar los límites de servicio.

- **Implementación conceptual**  
  Similar a las pruebas de estrés, pero con escalones más finos y criterios de abortar la prueba cuando se superan ciertos thresholds.

---

## 6. Pruebas de Escalabilidad (Scalability Testing)

- **Objetivo**  
  Evaluar cómo cambia el rendimiento al modificar recursos o arquitectura (horizontal o verticalmente).

- **Qué mide**

  - Relación entre carga y capacidad de escalado.
  - Eficiencia del escalado automático o manual.

- **Implementación conceptual**  
  Se ejecutan fases de carga incrementales coordinadas con cambios en la infraestructura (por ejemplo, añadir instancias) para medir la mejora en tiempos de respuesta y errores.
