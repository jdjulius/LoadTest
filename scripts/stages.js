import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,             // Número de usuarios virtuales
  duration: "10s",     // Duración de la prueba
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
  sleep(1); // Espera 1 segundo entre cada solicitud
}
