import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1, // solo 1 ejecución por VU para probar una vez cada método
};

export default function () {
  // 🔹 1. GET - Obtener productos
  let getRes = http.get("https://api.escuelajs.co/api/v1/products");
  check(getRes, {
    "GET status 200": (r) => r.status === 200,
  });

  // 🔹 2. POST - Crear usuario
  let postPayload = JSON.stringify({
    name: "Julio QA",
    email: `julio${Math.random()}@mail.com`,
    password: "123456",
    avatar: "https://api.lorem.space/image/face?w=150&h=150",
  });

  let postRes = http.post("https://api.escuelajs.co/api/v1/users", postPayload, {
    headers: { "Content-Type": "application/json" },
  });

  check(postRes, {
    "POST status 201": (r) => r.status === 201,
  });

  const userId = JSON.parse(postRes.body).id;

  // 🔹 3. PUT - Actualizar el usuario completo
  let putPayload = JSON.stringify({
    name: "Julio QA Editado",
    email: `editado${Math.random()}@mail.com`,
    password: "789456",
    avatar: "https://api.lorem.space/image/face?w=150&h=150",
  });

  let putRes = http.put(`https://api.escuelajs.co/api/v1/users/${userId}`, putPayload, {
    headers: { "Content-Type": "application/json" },
  });

  check(putRes, {
    "PUT status 200": (r) => r.status === 200,
  });

  // 🔹 4. PATCH - Actualizar parcialmente el usuario
  let patchPayload = JSON.stringify({
    name: "Julio PATCH",
  });

  let patchRes = http.patch(`https://api.escuelajs.co/api/v1/users/${userId}`, patchPayload, {
    headers: { "Content-Type": "application/json" },
  });

  check(patchRes, {
    "PATCH status 200": (r) => r.status === 200,
  });

  // 🔹 5. DELETE - Eliminar usuario
  let deleteRes = http.del(`https://api.escuelajs.co/api/v1/users/${userId}`);
  check(deleteRes, {
    "DELETE status 200": (r) => r.status === 200 || r.status === 204,
  });

  sleep(1);
}
