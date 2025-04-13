import http from "k6/http";

export const options = {
  stages: [
    {
      duration: "2m",     // Ramp-up a 200 VUs
      target: 200,
    },
    {
      duration: "3h30m",  // Mantener 200 VUs durante 3 horas y 30 minutos
      target: 200,
    },
    {
      duration: "2m",     // Ramp-down a 0 VUs
      target: 0,
    },
  ],
};

export default function () {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
}
