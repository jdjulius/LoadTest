import http from "k6/http";
import { check, sleep, fail } from "k6";
import { SharedArray } from "k6/data";

// === Cargar datos externos (data provider) ===
const productos = new SharedArray("productos", () =>
  JSON.parse(open("./data.json"))
);

export const options = {
  vus: 1,
  iterations: productos.length,
};

export default function () {
  const producto = productos[__ITER]; // tomar producto por iteración

  // === 1. Login para obtener token ===
  const loginPayload = JSON.stringify({
    email: "admin@mail.com",
    password: "admin123",
  });

  const loginRes = http.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    loginPayload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(loginRes, {
    "Login status 201": (r) => r.status === 201,
  });

  if (loginRes.status !== 201) {
    fail("❌ Login falló");
  }

  const token = JSON.parse(loginRes.body).access_token;

  // === 2. Crear producto con datos externos ===
  const createRes = http.post(
    "https://api.escuelajs.co/api/v1/products",
    JSON.stringify(producto),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  check(createRes, {
    "Producto creado - 201": (r) => r.status === 201,
  });

  const productoId = JSON.parse(createRes.body).id;

  // === 3. Consultar producto creado ===
  const getRes = http.get(
    `https://api.escuelajs.co/api/v1/products/${productoId}`
  );

  check(getRes, {
    "Consulta status 200": (r) => r.status === 200,
  });

  // === 4. Eliminar producto ===
  const delRes = http.del(
    `https://api.escuelajs.co/api/v1/products/${productoId}`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  check(delRes, {
    "Eliminado correctamente - 200": (r) => r.status === 200,
  });

  sleep(1);
}
