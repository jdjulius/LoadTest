import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    {
      duration: "2m",  // Aumenta hasta 100 VUs en 2 minutos
      target: 100,
    },
    {
      duration: "5m",  // Mantiene 100 VUs durante 5 minutos
      target: 100,
    },
    {
      duration: "2m",  // Escala hasta 400 VUs en 2 minutos
      target: 400,
    },
  ],
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
  sleep(1); // espera 1 segundo entre peticiones
}
