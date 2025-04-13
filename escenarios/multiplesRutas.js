import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,             // 10 usuarios simultáneos
  duration: "1m",      // durante 1 minuto
};

// Lista de rutas a testear
const routes = [
  { name: "Productos", url: "https://api.escuelajs.co/api/v1/products" },
  { name: "Categorías", url: "https://api.escuelajs.co/api/v1/categories" },
  { name: "Usuarios", url: "https://api.escuelajs.co/api/v1/users" },
  { name: "Carrito", url: "https://api.escuelajs.co/api/v1/carts" }, // si aplica
];

// Función de ejecución general
export default function () {
  // Alternamos rutas con base en el número de iteración
  const ruta = routes[__ITER % routes.length];

  const res = http.get(ruta.url);

  // Validaciones comunes
  check(res, {
    [`${ruta.name} - status 200`]: (r) => r.status === 200,
    [`${ruta.name} - JSON OK`]: (r) =>
      r.headers["Content-Type"] &&
      r.headers["Content-Type"].includes("application/json"),
    [`${ruta.name} - no vacío`]: (r) => r.body.length > 2,
  });

  sleep(1); // Espera 1s entre rutas
}
