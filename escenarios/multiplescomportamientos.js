import http from "k6/http";
import { sleep, check } from "k6";

// === CONFIGURACIÓN DE ESCENARIOS ===
export const options = {
  scenarios: {
    navegar_productos: {
      executor: "constant-vus",
      vus: 10,
      duration: "1m",
      exec: "verProductos",
    },
    buscar_categoria: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "30s", target: 5 },
        { duration: "30s", target: 10 },
        { duration: "30s", target: 0 },
      ],
      exec: "verCategorias",
    },
    crear_usuario: {
      executor: "per-vu-iterations",
      vus: 3,
      iterations: 1,
      maxDuration: "1m",
      exec: "crearUsuario",
    },
  },
};

// === ESCENARIO 1: NAVEGAR PRODUCTOS ===
export function verProductos() {
  const res = http.get("https://api.escuelajs.co/api/v1/products");

  check(res, {
    "Productos - status 200": (r) => r.status === 200,
    "Productos - respuesta JSON": (r) =>
      r.headers["Content-Type"].includes("application/json"),
  });

  sleep(1);
}

// === ESCENARIO 2: VER CATEGORÍAS ===
export function verCategorias() {
  const res = http.get("https://api.escuelajs.co/api/v1/categories");

  check(res, {
    "Categorías - status 200": (r) => r.status === 200,
  });

  sleep(2);
}

// === ESCENARIO 3: CREAR USUARIO (simulado) ===
export function crearUsuario() {
  const payload = JSON.stringify({
    name: "Julio QA",
    email: `julioqa${Math.random()}@test.com`,
    password: "superseguro123",
    avatar: "https://api.lorem.space/image/face?w=150&h=150",
  });

  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post("https://api.escuelajs.co/api/v1/users", payload, headers);

  check(res, {
    "Usuario creado - status 201": (r) => r.status === 201,
  });

  sleep(1);
}
