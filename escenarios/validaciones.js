import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5,               // 5 usuarios virtuales
  duration: "30s",      // durante 30 segundos
};

export default function () {
  const url = "https://api.escuelajs.co/api/v1/products";
  const headers = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer faketoken123" // opcional, para APIs seguras
    }
  };

  const response = http.get(url, headers);

  // ✅ Validaciones múltiples con check()
  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
    "body is not empty": (r) => r.body && r.body.length > 0,
    "is JSON content": (r) => r.headers["Content-Type"].includes("application/json"),
    "returns array of products": (r) => {
      try {
        const body = JSON.parse(r.body);
        return Array.isArray(body);
      } catch (e) {
        return false;
      }
    },
    "has at least one product": (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.length > 0;
      } catch (e) {
        return false;
      }
    }
  });

  sleep(1);
}
