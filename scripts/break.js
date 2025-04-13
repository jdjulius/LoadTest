import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<800"], // el 95% de respuestas debe tardar menos de 800ms
    http_req_failed: ["rate<0.05"],   // menos del 5% de errores permitidos
  },
  stages: [
    { duration: "30s", target: 10 },   // fase de calentamiento
    { duration: "30s", target: 50 },   // aumento moderado
    { duration: "30s", target: 100 },  // empieza a exigir más
    { duration: "30s", target: 200 },
    { duration: "30s", target: 300 },
    { duration: "30s", target: 400 },
    { duration: "30s", target: 500 },  // se busca el breaking point
    { duration: "30s", target: 0 },    // bajada
  ],
};

export default function () {
  const res = http.get("https://api.escuelajs.co/api/v1/products");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response is fast": (r) => r.timings.duration < 800,
  });

  sleep(1); // simula comportamiento humano
}
