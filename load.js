import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    {
      duration: "3m",   // Ramp-up inicial a 100 VUs
      target: 100,
    },
    {
      duration: "5m",   // Mantener 100 VUs
      target: 100,
    },
    {
      duration: "45s",  // Pico a 150 VUs
      target: 150,
    },
    {
      duration: "45s",  // Disminuye de vuelta a 100 VUs
      target: 100,
    },
    {
      duration: "5m",   // Estabilización final
      target: 100,
    },
  ],
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
  sleep(1);
}
