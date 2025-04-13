import http from "k6/http";

export const options = {
  stages: [
    {
      duration: "10s",  // Calentamiento suave hasta 10 VUs
      target: 10,
    },
    {
      duration: "1m",   // Pico súbito hasta 200 VUs
      target: 200,
    },
  ],
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
}
