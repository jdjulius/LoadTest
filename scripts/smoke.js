import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 1,              // 1 usuario virtual
  duration: "1m",      // duración de la prueba: 1 minuto
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
  sleep(1); // espera 1 segundo entre peticiones
}
